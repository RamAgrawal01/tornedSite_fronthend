import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TiCancelOutline } from "react-icons/ti";
import ModalButton from "../../common/ModalButton";
import { CiSaveDown1 } from "react-icons/ci";
import { updateProfile, updateUserProfileImage } from "../../../services/operations/settingAPI";
const EditProfile=()=>{
    
    const{user} = useSelector((state)=>state.profile);
    const{token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const{register , handleSubmit , formState:{errors}} = useForm();

    const updateProfileForm = async(data) => {
        // console.log("DATA: ",data);
        try{
            dispatch(updateProfile(token,data))
        }
        catch(error){
            console.log("ERRROR MESAGE: ",error.message);
        }
    }

    return(
        <>
        <form onSubmit={handleSubmit(updateProfileForm)}> 
            <div className=' my-10 flex flex-col gap-y-10  rounded-3xl border-[2px] border-navyblue-700
             bg-navyblue-800 p-8 px-3 sm:px-12 '>
                <h2 className="text-xl font-semibold underline text-navyblue-100">Profile Information</h2>

                <div className="grid sm:grid-cols-2 grid-cols-1  gap-y-8">
                    {/* FIRST NAME DIV */}
                    <div className="flex flex-col gap-y-2 lg:w-[48%]">
                        <label htmlFor="firstName" className="text-orange-200 text-sm">
                            First Name <span><sup>*</sup></span>
                        </label>
                        <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter First Name"
                        className="input-style"
                        {...register("firstName",{required:true})}
                        defaultValue={user?.firstName}/>
                        {errors.firstName&&(
                            <span className="text-[12px] text-orange-200"> 
                                Please Enter your name
                            </span>
                        )}
                    </div>

                    {/* LAST NAME DIV */}
                    <div className="flex flex-col gap-y-2 lg:w-[48%]">
                        <label htmlFor="lastName" className="text-orange-200 text-sm">
                            Last Name <span><sup>*</sup></span>
                        </label>
                        <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Enter Last Name"
                        className="input-style"
                        {...register("lastName",{required:true})}
                        defaultValue={user?.lastName}/>
                        {errors.lastName&&(
                            <span>
                                Please Enter your last name
                            </span>
                        )}
                    </div>

                    {/* Date Of Birth */}
                   <div className="flex flex-col gap-y-2 lg:w-[48%]">
                     <label htmlFor="dateOfBirth" className="text-orange-200 text-sm">Date Of Birth</label>
                     <input
                    type="date"
                    name="dateOfBirth"
                   id="dateOfBirth"
                    className="input-style"
                    {...register("dateOfBirth", {  required: false,
                    
                        max: {
                        value: new Date().toISOString().split("T")[0],
                        message: "Date of Birth cannot be in the future."
                    }})}
                    defaultValue={user?.additionalDetails?.dateOfBirth}/>
                    </div>

                    {/* GENDER */}
                    <div className="flex flex-col gap-y-2 lg:w-[48%]">
                    <label htmlFor="gender" className="text-orange-200 text-sm">Gender</label>
                     <select
                     name="gender"
                    id="gender"
                    className="input-style"
                    {...register("gender", { required: false })}
                    defaultValue={user?.additionalDetails?.gender || ""}>
                    <option value="" disabled>
                        Select Gender
                     </option>
                         <option value="Male">Male</option>
                         <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    </div>

                    {/* CONTACT NUMBER */}
                    <div className="flex flex-col gap-y-2 lg:w-[48%]">
                        <label htmlFor="contactNumber" className="text-orange-200 text-sm">Contact Number<span>
                            <sup>*</sup></span></label>
                        <input
                        type="tel"
                        name="contactNumber"
                        id="contactNumber"
                        placeholder="Enter Contact Number"
                        className="input-style"
                        {...register("contactNumber" , {required:true,
                            maxLength:{value:10,message:"Invalid Contact Number"},
                            minLength:{value:10,message:"Invalid Contact Number"},
                        })}
                        defaultValue={user?.contactNumber}/>
                        {errors.contactNumber &&(
                            <span className="text-[12px] text-orange-200" >
                                Enter Contact Number
                            </span>
                        )}
                        
                    </div>

                    {/* School Name */}
                    <div className="flex flex-col gap-y-2 lg:w-[48%]">
                        <label htmlFor="schoolName" className="text-orange-200 text-sm">School/Institution Name</label>
                        <input
                        type="text"
                        name="schoolName"
                        id="schoolName"
                        placeholder="Enter School Name"
                        className="input-style text-white"
                        {...register("schoolName",{required:false})}
                        defaultValue={user?.additionalDetails?.schoolName}/>
                    </div>
                </div>

                 {/* About and Address */}
                 <div className="grid sm:grid-cols-2 grid-cols-1 gap-y-5 mt-[1rem] ">
                        {/* About */}
                        <div className="flex flex-col gap-y-2 lg:w-[90%]">
                            <label htmlFor="about" className="text-orange-200 text-sm">About</label>
                            <input
                            type="text"
                            name="about"
                            id="about"
                            placeholder="Enter Bio Details"
                            className="input-style"
                            {...register("about",{required:false})}
                            defaultValue={user?.additionalDetails?.about}

                            />
                        </div>

                        {/* Adrress */}
                        <div className="flex flex-col gap-y-2 lg:w-[80%]">
                            <label htmlFor="address" className="text-orange-200 text-sm">Complete Address</label>
                            <input
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Enter your Address"
                            className="input-style"
                            {...register("address",{required:false})}
                            defaultValue={user?.additionalDetails?.address}

                            />
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
                <ModalButton type="submit" text="save">
                <CiSaveDown1 className="text-lg font-semibold" />
                </ModalButton>
            </div>
        </form>
        </>
    )
}
export default EditProfile;