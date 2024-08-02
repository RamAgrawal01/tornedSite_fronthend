import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { TiCancelOutline } from "react-icons/ti";
import { RiLockPasswordLine } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import ModalButton from '../../common/ModalButton';
import { changePassword } from '../../../services/operations/settingAPI';

const UpdatePassword = () => {

    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();

    const[showOldPassword , setShowOldPassword] = useState(false);
    const[showNewPassword , setShowNewPassword] = useState(false);
    const[showConfirmPassword , setShowConfirmPassword] = useState(false);

    const{register , handleSubmit , formState : {errors} } = useForm();

    const changeNewPassword = async(data) => {
        console.log("password Data - ", data)
    try {
      await changePassword(token, data)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

    return(
       <>
       <form onSubmit={handleSubmit(changeNewPassword)}>
        <div className=' my-10 flex flex-col gap-y-10  rounded-3xl border-[2px] border-navyblue-700
             bg-navyblue-800 p-8 px-3 sm:px-12'>
            <h2 className="text-xl font-semibold underline text-navyblue-100">Update Password</h2>

            <div className='flex flex-col gap-10 lg:flex-row'>
                {/* Current Password */}
                <div className='relative flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="oldPassword" className="text-orange-200 text-sm">Current Password
                        <sup className='text-pink-300 text-[12px]'>*</sup></label>
                    <input
                    type={showOldPassword?"text" : "password"}
                    name="oldPassword"
                    id="oldPassword"
                    placeholder='Enter Current Password'
                    className='input-style'
                    {...register("oldPassword",{require:true})}/>

                    <span onClick={()=>setShowOldPassword(!showOldPassword)}
                        className='absolute right-3 top-[39px] z-10 cursor-pointer'>
                        {
                         showOldPassword ? (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                         ):
                         (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />)
                        }
                    </span>

                    {errors.oldPassword &&(
                        <span>
                            Please Enter your current Password
                        </span>
                    )}
                </div>

                 {/* NEw Password */}
                 <div className='relative flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="newPassword" className="text-orange-200 text-sm">New Password
                        <sup  className='text-pink-300 text-[12px]'>*</sup></label>
                    <input
                    type={showNewPassword?"text" : "password"}
                    name="newPassword"
                    id="newPassword"
                    placeholder='Enter New Password'
                    className='input-style'
                    {...register("newPassword",{require:true})}/>

                    <span onClick={()=>setShowNewPassword(!showNewPassword)}
                       className='absolute right-3 top-[39px] z-10 cursor-pointer'>
                        {
                         showNewPassword ? (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                         ):
                         (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />)
                        }
                    </span>

                    {errors.newPassword &&(
                        <span className='text-[15px] text-pink-200'>
                            Please Enter your New Password
                        </span>
                    )}
                </div>

                 {/* Confirm Password */}
                 <div className='relative flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="confirmPassword" className="text-orange-200 text-sm">Confirm Password
                        <sup  className='text-pink-300 text-[12px]'>*</sup>
                        </label>
                    <input
                    type={showConfirmPassword?"text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder='Enter Confirm Password'
                    className='input-style'
                    {...register("confirmPassword",{require:true})}/>

                    <span onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                        className='absolute right-3 top-[39px] z-10 cursor-pointer'>
                        {
                         showConfirmPassword ? (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                         ):
                         (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />)
                        }
                    </span>

                    {errors.confirmPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter confirm Password.
                </span>
              )}
                </div>

            </div>
        </div>

            {/* Field for two buttons  */}
            <div className="flex justify-end gap-3">
                
                {/* Cancel button */}
                <button
            
                    onClick={()=>{navigate('/dashboard/my-profile')}}
                    className='cursor-pointer flex gap-x-2 items-center rounded-lg font-semibold py-2 px-5 bg-pink-200 text-richblack-900 hover:bg-richblack-900 hover:text-pink-200 '>
                        
                           Cancel
                           <span>
                            <TiCancelOutline className="text-lg"/>
                             </span>                      
                    </button>

                {/* Save Button */}
                <ModalButton type="submit" text="Update password">
                <RiLockPasswordLine className="text-lg" />
                </ModalButton>
            </div>
       </form>
       </>
    )
}
export default UpdatePassword;