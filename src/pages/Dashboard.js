import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";

const Dashboard =() => {

    const {loading:authLoading} = useSelector((state)=>state.auth);
    const {loading:profileLoading} = useSelector((state)=>state.profile);

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [])

    if(profileLoading||authLoading){
        return(
            <div className="mt-20">Loading....</div>
        )
    }
  

    return(
        <div className="flex relative min-h-[calc(100vh-3.5rem)]">
        <div className="max-w-[300px] h-full overflow-hidden">
          <Sidebar />
        </div>
      
        <div className="h-[calc(100vh-3.5rem)] overflow-auto w-full">
          <div className="p-10">
            <Outlet />
          </div>
        </div>
      </div>
    )
}
export default Dashboard;