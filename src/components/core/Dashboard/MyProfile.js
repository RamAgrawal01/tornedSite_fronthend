import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TiEdit } from "react-icons/ti";
import ModalButton from "../../common/ModalButton";
import { useEffect } from "react";
import { setScreenSize } from "../../../slices/sidebarSlice";

const MyProfile = () => {

const {user} = useSelector((state)=>state.profile)
const navigate = useNavigate();     

// useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [])
const dispatch = useDispatch()
const{openSideMenu , screenSize} = useSelector((state)=>state.sidebar);


    // ye wala hook screen ke size ko note kar rha ha
    useEffect(()=>{
        const handleResize = () => dispatch(setScreenSize(window.innerWidth))
        window.addEventListener('resize',handleResize)
        handleResize()
        return() => window.removeEventListener('resize',handleResize);
    })

  // this will hide course video , title , desc, if sidebar is open in small device
  // for good looking i have try this 
  if (openSideMenu && screenSize <= 640) return;


    return(
        <>
       
        <h1 className="text-4xl font-medium text-orange-100 text-center sm:text-left">My Profile</h1>

        {/* SECTION 1 */}
        <div className="flex  mt-14 items-center justify-between rounded-3xl border-[2px] border-navyblue-700
        bg-navyblue-800 p-8 px-3 sm:px-12 ">
            <div className="flex items-center gap-x-4">
                <img src={user.image}
                alt={`profile-${user?.firstName}`}
                className="aspect-square w-[78px] rounded-full object-cover"/>
                <div className="space-y-1">
                    <p className="text-lg font-semibold text-white capitalize">{user?.firstName+" "+user?.lastName}</p>
                    <p className="text-navyblue-200 text-sm">{user?.email}</p>
                </div>

                
                
            </div>
            <div className={`${screenSize<500 ? "hidden" : ""}`}>
            <ModalButton
            text={"Edit"}
            onClick={()=>{navigate("/dashboard/setting")}}
            
            >

                <TiEdit />
            </ModalButton>
            </div>

        </div>

        {/* SECTION 2 */}
        <div className=" my-10 flex flex-col gap-y-8 rounded-3xl border-[2px] border-navyblue-700
        bg-navyblue-800 p-8 px-7 sm:px-12">
            <div className="flex w-full items-center justify-between">
                <p className="text-xl font-semibold text-orange-400 underline">My Bio</p>
                <ModalButton
            text={"Edit"}
            onClick={()=>{navigate("/dashboard/setting")}}
            >

                <TiEdit />
            </ModalButton>
            </div>

            <p className={`${user?.additionalDetails?.about ? "text-white" : "text:navyblue-200"}`}
            
            > {user?.additionalDetails?.about ? user.additionalDetails.about : "Write something about yourself"}  </p>
        </div>

        {/* SECTION 3 */}
        <div className="my-10 flex flex-col gap-y-8 rounded-3xl border-[2px] border-navyblue-700
        p-8 px-7 sm:px-12 bg-navyblue-800 ">
            <div className="flex w-full justify-between items-center">
                <p className="text-xl font-semibold text-orange-400 underline">Personal Details</p>
                <ModalButton
            text={"Edit"}
            onClick={()=>{navigate("/dashboard/setting")}}
            >

                <TiEdit />
            </ModalButton>
            </div>

{/* 
            <div className="grid max-w-[500px] grid-cols-2"> */}
            <div className="grid grid-cols-2 gap-x-[2rem] gap-y-[4rem]">
                <div>
                    <p className="mb-2 text-base font-bold text-orange-200">First Name</p>
                    <p className="text-sm text-navyblue-100 capitalize">{user?.firstName}</p>
                </div>

                <div>
                    <p className="mb-2 text-base font-bold text-orange-200">Last Name</p>
                    <p className="text-sm text-navyblue-100 capitalize">{user?.lastName}</p>
                </div>

                <div>
                    <p className="mb-2 text-base font-bold text-orange-200">Account Type</p>
                    <p className="text-sm text-navyblue-100 capitalize">{user?.accountType}</p>
                </div>

                <div>
                    <p className="mb-2 text-base font-bold text-orange-200">Email</p>
                    <p className="text-sm text-navyblue-100 capitalize">{user?.email}</p>
                </div>

                <div>
                    <p className="mb-2 text-base font-bold text-orange-200">Gender</p>
                    <p className="text-sm text-navyblue-100 capitalize">{user?.additionalDetails?.gender ? user.additionalDetails.gender : "Click on Edit and Set your Gender"}</p>
                </div>

                

            

                <div>
                    <p className="mb-2 text-base font-bold text-orange-200">ContactNumber</p>
                    <p className="text-sm text-navyblue-100 capitalize">{user?.contactNumber}</p>
                </div>

                <div>
                    <p className="mb-2 text-base font-bold text-orange-200">Address</p>
                    <p className="text-sm text-navyblue-100 capitalize">{user?.additionalDetails?.address ? user.additionalDetails.address : "Add Your Address"}</p>
                </div>

                <div>
                    <p className="mb-2 text-base font-bold text-orange-200">School Name</p>
                    <p className="text-sm text-navyblue-100 capitalize">{user?.additionalDetails?.schoolName ? user.additionalDetails.schoolName : "Add Your School name"}</p>
                </div>

                <div>
                    <p className="mb-2 text-base font-bold text-orange-200">Date Of Birth</p>
                    <p className="text-sm text-navyblue-100 capitalize">{user?.additionalDetails?.dateOfBirth ? user.additionalDetails.dateOfBirth : "n"}</p>
                </div>
            </div>
            {/* </div> */}
            
        </div>



      
        </>
        
    )
}
export default MyProfile;