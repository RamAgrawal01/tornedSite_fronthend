import { studentEndpoints } from "../api";
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { resetCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/courseSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

// Load Cashfree script and initialize Cashfree object
async function loadCashfree() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.onload = () => {
      const cashfree = window.Cashfree({ // Use window.Cashfree since it's attached globally
        mode: "sandbox", // or "production" based on your environment
      });
      resolve(cashfree);
    };
    script.onerror = (error) => {
      reject(error);
    };
    document.body.appendChild(script);
  });
}

export async function buyCourse(token, coursesId, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try {
      console.log(token);
      console.log("userDetails: ", userDetails);
  
      const cashfree = await loadCashfree();
  
      // Step 1: Create order
      const orderResponse = await apiConnector(
        "POST",
        COURSE_PAYMENT_API,
        { coursesId },
        {
          Authorization: `Bearer ${token}`,
        }
      );
  
      console.log("orderResponse... ", orderResponse);
  
      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message);
      }
  
      const paymentSessionId = orderResponse.data.message.payment_session_id;
      const orderId = orderResponse.data.message.order_id;
      const orderAmount = orderResponse.data.message.order_amount;
      
      console.log("Payment Session Id:", paymentSessionId);
  
      // Step 2: Open Cashfree checkout
      const checkoutOptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: "_modal",
      };
  
      cashfree.checkout(checkoutOptions)
        .then(async (response) => {
          console.log("Checkout response:", response);
  
          if (response.paymentDetails && response.paymentDetails.paymentMessage === "Payment finished. Check status.") {
            // Step 3: Verify Payment - use orderId and amount you already have
            await verifyPayment(
                {
                  orderId,
                  amount: orderAmount,
                  coursesId,
                },
                token,
                navigate,
                dispatch
              );
  
            await sendPaymentSuccessEmail(response, token);
          } else {
            toast.error("Payment was not successful. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Checkout error:", error);
          toast.error("An error occurred while processing the payment");
        });
  
    } catch (error) {
      console.log("PAYMENT API ERROR.....", error);
      toast.error(error.response?.data?.message || "Could not make Payment");
    }
    toast.dismiss(toastId);
  }

// ================ send Payment Success Email ================
async function sendPaymentSuccessEmail(response, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.order.orderId, // Cashfree order id
        paymentId: response.transaction.transactionId, // Cashfree payment id
        amount: response.order.orderAmount, // Amount
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
  }
}

// ================ verify payment ================
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));

  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Payment Successful, you are added to the course");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR....", error);
    toast.error("Could not verify Payment");
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}
