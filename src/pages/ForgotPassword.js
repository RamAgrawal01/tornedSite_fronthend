import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import Loader from "../components/common/Loader"
 
const ForgotPassword = () => {

    const [emailSent , setEmailSent] = useState(false);
    const [email , setEmail] = useState("");
    const {loading} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();


    const submitHandler = (e) => {
        e.preventDefault();
        // set email sent isliye liya kyu ki jab email enter karenge to set email me email ki value aegi
        //or fir vo dusre wale page par le jaega
        dispatch(getPasswordResetToken(email,setEmailSent))
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {loading ? (
                <div className="text-xl font-bold"><Loader/></div>
            ) : (
                <div className="bg-navyblue-900 p-6 rounded-lg shadow-md max-w-md w-full">
                    <h1 className="text-2xl font-semibold mb-4 text-orange-200">
                        {!emailSent ? "Reset Your Password" : "Check Your Email"}
                    </h1>

                    <div className="my-4 text-lg leading-relaxed text-navyblue-50">
                        {!emailSent ? (
                            "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."
                        ) : (
                            <p>
                                We have sent the reset email to{" "}
                                <span className="text-navyblue-300 font-semibold">{email}</span>
                            </p>
                        )}
                    </div>

                    <form onSubmit={submitHandler} className="space-y-4">
                        {!emailSent && (
                            <label className="block">
                                <p className="text-orange-100">
                                    Email Address <sup className="text-red-600">*</sup>
                                </p>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email"
                                    className="mt-1 p-2 w-full border rounded-md input-style"
                                />
                            </label>
                        )}
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-orange-500 text-black font-bold rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            {!emailSent ? "Submit" : "Resend Email"}
                        </button>
                    </form>

                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/login" className="text-blue-600 hover:underline flex items-center gap-x-2">
                            <BiArrowBack /> Back To Login
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
export default ForgotPassword;