import React from "react";
import { Link } from "react-router-dom";

const CTAButton = ({ children, active, linkto, onClick }) => {
    const buttonClasses = `text-center text-[15px] px-6 py-3 rounded-full shadow-[3px_3px_0px_0px_rgba(255,255,255,0.18)] shadow-navyblue-300 font-bold ${
        active ? "bg-yellow-50 text-black" : "bg-navyblue-700  text-white"
    } hover:scale-95 hover:shadow-none transition-all duration-200  shadow-lg`;

    return linkto ? (
        <Link to={linkto} className={buttonClasses} onClick={onClick}>
            {children}
        </Link>
    ) : (
        <div className={buttonClasses} onClick={onClick}>
            {children}
        </div>
    );
};

export default CTAButton;