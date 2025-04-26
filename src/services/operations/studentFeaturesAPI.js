import {studentEndpoints} from "../api";
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import rzplogo from "../../assets/Logo/rzp_logo.png"
import {resetCart} from "../../slices/cartSlice"
import { setPaymentLoading } from "../../slices/courseSlice";
const {
    COURSE_PAYMENT_API ,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API
} = studentEndpoints;

//equibalent to add script
function loadScript(src) {
    return new Promise((resolve)=> {
        const script = document.createElement("script");
        script.src = src;
        
        script.onload=()=> {
            resolve(true);
        }
        script.onerror=()=>{
            resolve(false);        
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token , coursesId , userDetails , navigate , dispatch) {
    const toastId = toast.loading("Loading....");
    // console.log('Token: ',token);
    // console.log("coursesId: ",coursesId);
    try{
        //load the scirpt
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        // console.log("RES of script : ",res)
        if(!res) {
            toast.error('Razorpay SDK failed to load')
            return;
        }
        console.log(token);
        //order initialize
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,
            //mistake : - i use same name coursesId in my backend code to get from the body 
            { coursesId },
            {
                Authorization: `Bearer ${token}`,
            })
        console.log("orderResponse... ", orderResponse);
        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        //create options
        const options ={
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: orderResponse.data.message.amount,
            order_id: orderResponse.data.message.id,
            name: "Torned Education",
            description: "Thanks for Purchasing course",
            image: rzplogo,
            prefill : {
                name : `${userDetails.firstName}{" }${userDetails.lastName}`,
                email : userDetails.email
            },
            handler: function (response) {
                //send successful mail
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);
                //verifyPayment
                verifyPayment({ ...response, coursesId }, token, navigate, dispatch);
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("oops, payment failed");
            console.log("payment failed.... ", response.error);
        })

    }
    catch (error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error(error.response?.data?.message);
        // toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}




// ================ send Payment Success Email ================
async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        }, {
            Authorization: `Bearer ${token}`
        })
    }
    catch (error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}


// ================ verify payment ================
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));

    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        })

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, you are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }
    catch (error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}