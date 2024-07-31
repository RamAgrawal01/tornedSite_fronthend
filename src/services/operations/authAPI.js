import { setLoading, setToken } from "../../slices/authSlice"
import { apiConnector } from "../apiConnector";
import { endpoints } from "../api";
import toast from "react-hot-toast";
import { setUser } from "../../slices/profileSlice";


const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
  } = endpoints
//**********PASSWORD RESET TOKEN*************** */

export function getPasswordResetToken(email,setEmailSent){
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",RESETPASSTOKEN_API ,{email})
            console.log("RESET PASSWORD TOKEN RESPONSE...",response)

            if(!response.data.success){
                toast.error(response.data.message);
                throw new Error(response.data.message);
            }
            toast.success("Reset Email Sent ");
            setEmailSent(true);
        }
        catch(error){
            console.log("error while reset password: ", error)
            if (error.response && error.response.status === 401) {
                toast.error(error.response.data.message);
              } else {
                // Handle other errors
                toast.error("Failed to send Reset Password Link");
              }
        
              // Log the error response for debugging
              console.error('Error response data:', error.response?.data);
            } finally {
              dispatch(setLoading(false));
            }
          };
        }

//******************SEND OTP**********************  */
export function sendOtp(email, navigate) {
    return async (dispatch) => {
      dispatch(setLoading(true));
  
      try {
        const response = await apiConnector("POST", SENDOTP_API, {
          email,
          checkUserExist: true,
        });
  
        console.log("Response of otpAPI:", response);
  
        if (!response.data.success) {
          toast.error(response.data.message);
          throw new Error(response.data.message);
        }
  
        navigate("/verify-email");
        toast.success("OTP Sent Successfully");
      } catch (error) {
        console.log("SEND OTP ERROR:", error);
  
        // Handle the specific 401 error for user already registered
        if (error.response && error.response.status === 401) {
          toast.error(error.response.data.message);
        } else {
          // Handle other errors
          toast.error("Failed to send OTP");
        }
  
        // Log the error response for debugging
        console.error('Error response data:', error.response?.data);
      } finally {
        dispatch(setLoading(false));
      }
    };
  }
//******************SIGNUP**********************  */
export function signup(accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    contactNumber, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            contactNumber,
            });
            console.log("Response of Signup:", response);

            if (!response.data.success) {
                toast.error(response.data.message);
                throw new Error(response.data.message);
            }

            toast.success("SignUp Successful");
            navigate("/login");
        } catch (error) {
            console.error("SIGNUP ERROR:", error);

            // Display specific error message from the response if available
            const errorMessage = error.response?.data?.message || 'Cannot Signup Right now';
            toast.error(errorMessage);
        } finally {
            dispatch(setLoading(false));
        }
    };
}
//******************LOGIN**********************  */
export function login(email ,password , navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try{
            const response = await apiConnector("POST" , LOGIN_API,{
                email , password
            })
            if(!response.data.success){
                toast.error(response.data.message)
                throw new Error(response.data.message) 
            }
            toast.success("Login Success");
            dispatch(setToken(response.data.token))

            const userImage = response.data?.user?.image
            ? response.data.user.image : 
            `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            
            dispatch(setUser({...response.data.user , image:userImage}));
            localStorage.setItem("token",JSON.stringify(response.data?.token));
            localStorage.setItem("user",JSON.stringify({...response.data.user,image:userImage}))
            // console.log("USER: ",response.data.user);
            navigate("/dashboard/my-profile");
        }
        catch(error){
            toast.error(error.response?.data?.message)
        }
        dispatch(setLoading(false));
    }
}
//******************LOGOUT**********************  */
export function logout(navigate){
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        // dispatch(resetCatt());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out-- BYE bYe");
        navigate("/")
    }
}
//******************RESET PASSWORD **********************  */
export function ResetPassword(password , confirmPassword , token , navigate){
    return async (dispatch) => {
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST" , RESETPASSWORD_API ,{
                password , confirmPassword , token

                
            })
            if(!response.data.success){
                toast.error(response.data.message);
                throw new Error(response.data.message);
            } 
            toast.success("Password reset SUccess");
            navigate("/login")
        }
        catch (error) {
            console.log("RESETPASSWORD ERROR............", error)
            toast.error(error.response?.data?.message)
            // toast.error("Failed To Reset Password");
          }
          dispatch(setLoading(false))
    }
}