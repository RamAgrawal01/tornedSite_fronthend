import React from "react";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { FcGoogle } from "react-icons/fc";
import Img from "../../common/Img";
import { useSelector } from "react-redux";
import Loader from "../../common/Loader";

const Template = ({title,desc1,desc2,image,formtype}) =>{

    const {loading} = useSelector((state)=>state.auth)
    return(
        <div>
            {
                loading?(<div><Loader/></div>) :
                (
                    <div>
                          <div className="flex sm:flex-row flex-col-reverse w-11/12 max-w-[1160px] mx-auto gap-x-12 gap-y-0  justify-between items-center">

<div className="w-11/12  max-w-[500px] mt-4">
    <h1 className="text-[#ff7f50] font-semibold text-[1.875rem] leadng-[2.275rem]">{title}</h1>
    <p className="text-[1.125rem] leading-[1.625rem] mt-3">
        <span className="text-[#e5e5e5]">{desc1}</span>
        <br/>
        <span className="text-[#fca5a5] italic">{desc2}</span>
    </p>

    {formtype === "signup" ? <SignupForm /> :
     <LoginForm  />}

     {/* <div className="flex w-full items-center my-2  gap-x-2">
        <div className="h-[1px] w-full bg-[#d6d3d1]"></div>
        <div className="text-[#d6d3d1]">OR</div>
        <div className="h-[1px] w-full bg-[#d6d3d1]"></div>
     </div> */}


</div>

{/* div for picture */}

<div className="relative w-11/12 max-w-[550px] mt-[5rem]">

    
    {/* <img src={image} alt="patter"  loading="lazy"
    className="absolute w-[500px] h-[420px] border-[#ffffff] border-2"
    /> */}

    <Img
src={image}

className={'  w-[500px] lg:h-[420px] h-[350px] border-[#ffffff] border-2'}
/>
</div>


</div>
                    </div>
                )
            }
        </div>
      
    )
}
export default Template;