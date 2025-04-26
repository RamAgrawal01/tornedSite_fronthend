import React, { useDebugValue, useState } from "react";
import { AiOutlineEye , AiOutlineEyeInvisible } from "react-icons/ai";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import gif from "../../../assets/loginsignupimages/Fireworks-Animated-Illustratio-unscreen.gif"
import { setSignupData } from "../../../slices/authSlice";
import { sendOtp } from "../../../services/operations/authAPI";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { useDispatch } from "react-redux";


const SignupForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const[formData,setFormData] = useState({firstName:"" , lastName:"" , email:"",
        password:"" , confirmPassword:"" , contactNumber:""
    })

    const [showPassword , setShowPassword] = useState(false);
    const [showConfirmPassword ,setShowConfirmPassword] = useState(false);
    const[accountType , setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

    const { firstName, lastName, email, password, confirmPassword , contactNumber } = formData;

    function changeHandler(event) {
        setFormData(
            (prev) => ({
                    ...prev,
                    [event.target.name]: event.target.value,
                }),
        );
    }
    function submitHandler(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
        if (!/[A-Z]/.test(formData.password)) {
            toast.error("Password must include at least one uppercase letter");
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
      
          // Proceed with form submission logic 
          const signupData = {
            ...formData,
            accountType,
          };
          // console.log(signupData)

          //setting signup data to state
          //to be used after otp verification
          dispatch(setSignupData(signupData));
          
          //send OTP to user for verification
          dispatch(sendOtp(email,navigate))
          
    // Reset form data
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      contactNumber:""
    })
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

        

    return(


        <div className="-translate-[5rem] relative">

{showSuccessAnimation && (
          <div className="mt-4 flex justify-center items-center w-full">
            <img src={gif}alt="Success Animation" className="absolute" />
          </div>
        )}
            {/* Student -Instructor Tab */}
            <div className="flex bg-[#1e40af] max-w-max rounded-full p-1 gap-x-1 mt-3">
        <button
          className={`${accountType === ACCOUNT_TYPE.STUDENT
            ?
            "bg-[#1e3a8a] text-[#FFFFE0]"
            : "bg-transparent text-[#bfdbfe]"} py-2 px-5 rounded-full transition-all duration-200`}
          onClick={() => setAccountType(ACCOUNT_TYPE.STUDENT)}>
          Student
        </button>

        <button
          className={`${accountType === ACCOUNT_TYPE.INSTRUCTOR
            ?
            "bg-[#1e3a8a] text-[#FFFFE0]"
            : "bg-transparent text-[#bfdbfe]"} py-2 px-5 rounded-full transition-all duration-200`}
          onClick={() => setAccountType(ACCOUNT_TYPE.INSTRUCTOR)}>
          Instructor
        </button>
      </div>
           

            <form onSubmit={submitHandler}>
                {/* div create for first name and last name */}
                <div className="flex lg:flex-row flex-col justify-between mt-[16px]">
                <label >
                    <p className="text-[0.9rem] text-[#FFFFE0] mb-1
                leading-[1.375rem]">
                    First Name
                    <sup className="text-[#ff7f50] text-[0.8rem]">*</sup></p>

                    <input className="bg-[#1e40af] h-[2.5rem] rounded-[0.5rem] text-[#FFFFE0] w-full p-[12px]"
                     required type="text"
                    name="firstName" placeholder="Enter First Name"
                    value={firstName} onChange={changeHandler}></input>
                </label>

                <label>
                    <p className="text-[0.9rem] text-[#FFFFE0] mb-1
                leading-[1.375rem]">
                    Last Name
                    <sup className="text-[#dc2626] text-[0.8rem]">*</sup></p>

                    <input className="bg-[#1e40af] h-[2.5rem] rounded-[0.5rem] text-[#FFFFE0] w-full p-[12px]"
                     required type="text"
                    name="lastName" placeholder="Enter Last Name"
                    value={lastName} onChange={changeHandler}></input>
                </label>
                </div>

            {/* Email Address */}
            <div className="mt-[16px]">
            <label>
                <p className="text-[0.9rem] text-[#FFFFE0] mb-1
                leading-[1.375rem]">
                    Email Address<sup className="text-[#dc2626] text-[0.8rem]">*</sup></p>

            <input className="bg-[#1e40af] h-[2.5rem] rounded-[0.5rem] text-[#FFFFE0] w-full p-[12px]"
             type="email" required 
            name="email" value={email} placeholder="Enter Email-address"
            onChange={changeHandler}></input>
            </label>
            </div>

            {/* Contact Number */}
            <div className="mt-[16px]">
            <label>
                <p className="text-[0.9rem] text-[#FFFFE0] mb-1
                leading-[1.375rem]">
                    Contact Number<sup className="text-[#dc2626] text-[0.8rem]">*</sup></p>

            <input className="bg-[#1e40af] h-[2.5rem] rounded-[0.5rem] text-[#FFFFE0] w-full p-[12px]"
             type="contactNumber" required 
            name="contactNumber" value={contactNumber} placeholder="Enter Contact Number"
            onChange={changeHandler}></input>
            </label>
            </div>
                

            {/*  div create password and confirm password */}
            
            <div className="flex lg:flex-row flex-col gap-x-6 mt-[16px]" >   
                {/* new passsword section */}
                <label className="w-full relative">

                    <p className="text-[0.9rem] text-[#FFFFE0] mb-1
                leading-[1.375rem]"> 
                Create Password<sup className="text-[#dc2626] text-[0.8rem]">*</sup></p>

                    <input className="bg-[#1e40af] h-[2.5rem] rounded-[0.5rem] text-[#FFFFE0] w-full p-[12px]" 
                     required 
                     type={showPassword ? ("text") : ("password")}
                    name="password" placeholder="New Password"
                    value={password} onChange={changeHandler}></input>

                     <span onClick={() => setShowPassword(!showPassword)}
                     className="absolute right-3 top-[35px] cursor-pointer">
                     {showPassword ? (<AiOutlineEye  fontSize={24} fill="#AFB2BF"  />) :
                      (<AiOutlineEyeInvisible  fontSize={24} fill="#AFB2BF" />) }
                     </span>
                </label>

                {/* confirm passsword section */}

                <label className="w-full relative">
                    <p className="text-[0.9rem] text-[#FFFFE0] mb-1
                leading-[1.375rem]"> Confirm Password<sup className="text-[#dc2626] text-[0.8rem]">*</sup></p>

                    <input className="bg-[#1e40af] rounded-[0.5rem] h-[2.5rem] text-[#FFFFE0] w-full p-[12px]" 
                    required 

                     type={showConfirmPassword ? ("text") : ("password")}
                    name="confirmPassword" placeholder="Confirm Password"
                    value={confirmPassword} onChange={changeHandler}></input>

                     <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                     className="absolute right-3 top-[35px] cursor-pointer">
                     {showConfirmPassword ? (<AiOutlineEye fontSize={24} fill="#AFB2BF" />) 
                     : (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />) }
                     </span>
                </label>
                </div>
                   <button className=" bg-[#ff7f50] font-semibold text-[#050505]  px-[12px] py-[8px] rounded-[8px]
                     mt-6 w-full hover:scale-105 hover:transition-all duration-200 hover:font-bold">Create Account</button>

               </form>
          
        </div>
    )
}
export default SignupForm;