import React, { useEffect , useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../../services/apiConnector";
import { contactusEndpoint } from "../../../services/api";
import toast from "react-hot-toast";
import CountryCode from "../../../data/countrycode.json"
const ContactUsForm = () => {
    
    const {
        register,handleSubmit,reset,
        formState: { errors, isSubmitSuccessful },
      } = useForm()

      const submitHandler = async (data) => {
        const toastId = toast.loading("Loading...");
        try {
            
            // setLoading(true);
            console.log("DATA: ", data);
    
            const { firstName, lastName, email, message, phoneNo } = data;
    
            const res = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, {
                firstName,
                lastName,
                email,
                message,
                phoneNo
            });
    
            if (!res.data.success) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
            }
    
            console.log("RESPONSE CONTACT: ", res);
           
        } catch (error) {
            // Handle the specific 401 error for user already registered
            console.log("ERROR IN DATA: ", error);
            if (error.response && error.response.status === 401) {
                toast.error(error.response.data.message);
            } else {
                // Handle other errors
                toast.error("Failed to send message");
            }
        } finally {
            // setLoading(false);
            toast.dismiss(toastId);
        }
    };

      useEffect(()=> {
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstName: "",
                lastName : "",
                message : "",
                contactNo : "",
            })
        }
      },[reset, isSubmitSuccessful])

    return(
        <form onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-7">

        
        <div className="flex flex-col gap-5 lg:flex-row">
            {/* FIRST NAME */}
            <div className="flex flex-col gap-2 lg:w-[48%] ">
                <label htmlFor="firstName" className="label-style">First Name</label>
                <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first Name"
                className="input-style"
                {...register("firstName",{required:true})}
                />
                {
                    errors.firstName && (
                        <span className="text-[12px] text-orange-200">
                            Please Enter your first name
                        </span>
                    )
                }
            </div>

             {/* LAST NAME */}
             <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="lastName" className="label-style">Last Name</label>
                <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter Last Name"
                className="input-style"
                {...register("lastName",{required:true})}
                />
                 {
                    errors.firstName && (
                        <span className="text-[12px] text-orange-200">
                            Please Enter your last name
                        </span>
                    )
                }
                

                
            </div>
        </div>
        {/* EMAIL */}
        <div className="flex flex-col gap-2">
            <label htmlFor="email" className="label-style">Enter Email Address</label>
            <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email Address"
            className="input-style"
            {...register("email",{required:true})}
            />
            {
                errors.email &&(
                    <span className="text-[12px] text-orange-200 ">
                        Please enter your email address
                    </span>
                )
                    
                
            }
        </div>

        {/* PHONE NUMBER */}
        <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="label-style">
        Enter Conact Number
        </label>

        <div className="flex gap-5">
          <div>
            <select
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className="input-style w-[77px]"
              {...register("countrycode", { required: true , value:"+91"})}
            >
              {CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code}>
                    {ele.code} -{ele.country}
                  </option>
                )
              })}
            </select>
          </div>

          <div className="w-[calc(100%-87px)]">
            <input
              type="text"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="input-style w-[100%]"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 10, message: "Invalid Phone Number" },
                minLength: { value: 8, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="text-[12px] text-orange-200">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

        {/* MESSAGE BOX */}
        <div className="flex flex-col gap-2">
            <label htmlFor="message" className="label-style">Message</label>
            <textarea
            name="message"
            id="message"
            cols="30"
            rows="6"
            placeholder="Enter your Message here"
            className="input-style"
            {...register("message",{required:true})}
            />
            {
                errors.message &&(
                    <span className="text-12px] text-orange-200">
                        Please Enter your message
                    </span>
                )
            }
        </div>

        {/* BUTTON */}
        <button type="submit" 
        className="rounded-md bg-orange-500 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
        transition-all duration-200 hover:scale-95 hover:shadow-none
        disabled:bg-richblack-500 sm:text-[16px]">
            Send Message
        </button>
        

        
        </form>
    )
}
export default ContactUsForm;