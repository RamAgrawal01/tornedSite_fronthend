import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword } from "../services/operations/authAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";


const UpdatePassword = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [formData , setFormData] = useState({password:"" , confirmPassword:"",})
    const [showPassword , setShowPassword] = useState(false);
    const [showConfirmPassword , setShowConfirmPassword] = useState(false);
    const {loading} = useSelector((state)=>state.auth);

    

    const changeHandler = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    }
    const{password , confirmPassword} = formData;
    // console.log("form data: ",formData);

    const submitHandler =(e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error("Password do not match");
            return;
        }

        if(!/[A-z]/.test(formData.password)){
            toast.error("Password must include atlease one upperCase letter")
            return;
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            toast.error("Password must include at least one special character");
            return;
          }
      
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }

    const token = location.pathname.split("/").at(-1)
    dispatch(ResetPassword(password, confirmPassword, token, navigate))

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {loading ? (
                <div className="text-xl font-bold"><Loader/></div>
            ) : (
                <div className="bg-navyblue-900 p-6 rounded-lg shadow-md max-w-md w-full">
                    <h1 className="text-2xl font-semibold mb-4 text-orange-300">Choose New Password</h1>
                    <p className="text-gray-700 mb-4 text-navyblue-50">Almost done, enter your new password and you're all set.</p>

                    <form onSubmit={submitHandler} className="space-y-4">
                        <label className="block">
                            <p className="text-orange-200">
                                New Password <sup className="text-red-600">*</sup>
                            </p>
                            <div className="relative">
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter new Password"
                                    value={password}
                                    name="password"
                                    onChange={changeHandler}
                                    className="input-style w-full"
                                />
                                <span
                                    className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24} />}
                                </span>
                            </div>
                        </label>

                        <label className="block">
                            <p className="text-orange-200">
                                Confirm Password <sup className="text-red-600">*</sup>
                            </p>
                            <div className="relative">
                                <input
                                    required
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Enter confirm Password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={changeHandler}
                                    className="input-style w-full"
                                />
                                <span
                                    className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24} />}
                                </span>
                            </div>
                        </label>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-orange-500 text-black font-bold rounded-md hover:bg-navyblue-600 transition duration-200"
                        >
                            Reset Password
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
export default UpdatePassword;