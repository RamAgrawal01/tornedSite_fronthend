import React from "react";
import * as Icons from "react-icons/vsc";
import * as Icons2 from "react-icons/ci"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { matchPath, useLocation, NavLink } from "react-router-dom";
import { setOpenSideMenu } from "../../../slices/sidebarSlice";

const SidebarLinks = ({ link = {}, iconName }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const{openSideMenu , screenSize} = useSelector((state)=>state.sidebar);
    const Icon = Icons[iconName] || Icons2[iconName];

    if (!Icon) {
        console.error(`Icon with name ${iconName} does not exist in react-icons/vsc`);
        return null;  // Return null or some fallback UI if the icon is not found
    }

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };
  
    function sideBarHandler(){
        if(screenSize<=640){
            dispatch(setOpenSideMenu(false))
        }
    }
   

    return (
        <NavLink
            to={link.path}
            className={`relative px-8 py-2 text-base font-medium
                ${matchRoute(link.path) ? "bg-orange-400 text-black" : 
                    "text-orange-50 hover:bg-navyblue-700  transition-all duration-200 hover-float"}`}
           
        >
            <span className={`absolute left-0 top-0 h-full w-[0.3rem] bg-orange-100
                ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}>
            </span>

            <div className="flex items-center gap-x-2"
            onClick={sideBarHandler}>
                <Icon className="text-lg" />
                <span>{link.name}</span>
            </div>
        </NavLink>
    );
};

export default SidebarLinks;
