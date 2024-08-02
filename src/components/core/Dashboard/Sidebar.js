import React, { useDeferredValue, useEffect } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SidebarLinks from "./SidebarLinks";
import {  useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import { HiMenu } from "react-icons/hi";
import { GiSplitCross } from "react-icons/gi";
import { useState } from "react";
import { setScreenSize,setOpenSideMenu } from "../../../slices/sidebarSlice";
import ConfirmationModal from "../../common/confirmationModal";
const Sidebar = () => {
    
    const {user , loading:profileLoading} = useSelector((state)=>state.profile)
    const{loading:authLoading} = useSelector((state)=>state.profile);
    const [confirmationModal , setConfirmationMdodal] = useState(null);

    const{openSideMenu , screenSize} = useSelector((state)=>state.sidebar);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ye wala hook screen ke size ko note kar rha ha
    useEffect(()=>{
        const handleResize = () => dispatch(setScreenSize(window.innerWidth))
        window.addEventListener('resize',handleResize)
        handleResize()
        return() => window.removeEventListener('resize',handleResize);
    })

    //agar screen size chota hoga to bar ki close karke sirf small routes visiblehonge
    useEffect(()=>{
        if(screenSize<= 640){
            dispatch(setOpenSideMenu(false))
        }
        else(dispatch(setOpenSideMenu(true)))
    },[screenSize])

    if(profileLoading||authLoading) {
        return(
            <div className="mt-20">
                Loading.....
            </div>
        )
    }

    return (
        <>
         <div className="sm:hidden absolute left-7 top-3 cursor-pointer z-[1000] flex h-[40px] w-[40px] items-center justify-center rounded-full bg-navyblue-300 p-2 text-navyblue-900 
                                hover:scale-95 transition-all duration-200   "
                                 onClick={() => dispatch(setOpenSideMenu(!openSideMenu))}>
        {
          openSideMenu ? <GiSplitCross size={33} /> : <HiMenu size={33} />
        }
      </div>

        {
            openSideMenu &&
            <div>
            <div className={`flex flex-col min-h-[250px] h-[calc(100vh-3.5rem)] border-r-[1px] border-r-navyblue-700
            bg-navyblue-800 py-10 ${screenSize<500 ? "w-[500px]" : "w-[300px]"}`}>

                <div className="flex flex-col mt-6 gap-2">
                    {
                        sidebarLinks.map((link)=>{
                            if(link.type && user?.accountType !== link.type) return null;
                            return(
                                <SidebarLinks key={link.id}  link={link} iconName={link.icon}/>
                            )
                                
                        })
                    }
                </div>

                <div className="mx-auto my-6 h-[2px] w-10/12 bg-navyblue-600"></div>

                <div className="flex flex-col">
                    <SidebarLinks
                        link={{name:"Setting" , path:"dashboard/settings"}}
                        iconName={"CiSettings"}
                    />

                    <button onClick={()=>setConfirmationMdodal({
                         text1:"Are You Sure ?",
                         text2:"You will be logged out of your Account",
                         buttonText:"Logout",
                         button2Text:"Cancel",
                         buttonHandler: () => dispatch(logout(navigate)),
                         button2Handler:() => setConfirmationMdodal(null),
                    })}
                    className="text-sm font-medium text-navyblue-300"
                    >
                       <div className="flex items-center gap-x-2 px-8 py-2 text-base text-orange-50
                     relative hover:bg-navyblue-700  transition-all duration-200 hover-float">
                             <VscSignOut className="text-lg" />
                             <span className="hover-float">Logout</span>
    </div>

                    </button>

                </div>
                    {
                        confirmationModal && <ConfirmationModal modalData={confirmationModal} />
                    }
            </div>

        </div>
        }
        </>
    )
}
export default Sidebar;