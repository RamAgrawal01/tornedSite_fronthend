import { motion } from "framer-motion";
import React from "react";
import HighlightText from "../HomePage/HighlightText";
import { useSelector } from "react-redux";
import { scaleUp } from "../../common/motionFrameVarients";

const Quote = () => {
    
    return(
        <motion.div
        variants={scaleUp}
        initial='hidden'
        whileInView={'show'}
        viewport={{once:false,amount:0.1}}
        
        
        
        className="text-xl md:text-3xl font-semibold mx-auto py-4         text-center text-navyblue-50 ">
            We are Passionate about revolutionizing the way we learn, Our 
            innovative platform
            <HighlightText text={" combines Technology "}/>
            <span className="gradient_color3 font-extrabold">  
                expertise
             </span>
             , and an community to create an 
             
             <span className="gradient_color3 font-extrabold">  
                {" "}
                unparalleled educational experience
             </span>
        </motion.div>
          

    )
}
export default Quote;

        
        
        
    