import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { sendOtp, signup } from "../services/operations/authAPI";
import { useNavigate, Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Loader from "../components/common/Loader";

const VerifyEmail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const { loading, signupData } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, [signupData, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!signupData) {
            return;
        }
    
        const {
            accountType,
            contactNumber,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;
    
        dispatch(signup(accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            contactNumber, navigate));
    };
    

    return (
        <div className="grid place-items-center min-h-screen bg-gray-100">
            {loading ? (
                <div><Loader /></div>
            ) : (
                <div className="max-w-md w-full p-6 bg-navyblue-900 rounded-lg shadow-md">
                    <h1 className="text-2xl font-semibold mb-4 text-orange-300">Verify Email</h1>
                    <p className="text-gray-700 mb-4 text-navyblue-50">
                        A verification code has been sent to you, Enter the code below
                    </p>
                    <form onSubmit={submitHandler} className="space-y-4">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    placeholder="-"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-7 lg:w-10 border-0 bg-navyblue-800 rounded-md text-navyblue-50 aspect-square text-center focus:border-0 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                            )}
                            containerStyle={{
                                justifyContent: "center",
                                gap: "0 25px",
                            }}
                        />
                        <button type="submit" className="w-full py-2 px-4 bg-orange-500 text-black font-bold rounded-md hover:bg-navyblue-600 transition duration-200">
                            Verify Email
                        </button>
                    </form>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/login" className="flex items-center gap-x-2 text-blue-600 hover:underline">
                            <BiArrowBack /> Back To Login
                        </Link>
                        <button
                            onClick={() => dispatch(sendOtp(signupData.email, navigate), setOtp(''))}
                            className="text-orange-500 hover:underline"
                        >
                            Resend it
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerifyEmail;