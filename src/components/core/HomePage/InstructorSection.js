import React from "react";
import instructorImage from "../../../assets/Images/Instructor.png"
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "./HighlightText";
import { motion } from "framer-motion";
import { scaleUp } from "../../common/motionFrameVarients";


const InstructorSection = () => {
    return(
        <div className="mt-16">
            <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-20 items-center">

            <motion.div
            variants={scaleUp}
            initial='hidden'
            whileInView={'show'}
            viewport={{once:false,amount:0.1}}
            className="lg:w-[50%] p-6"
            >
                <img 
                    src={instructorImage}
                    alt=""
                    className="shadow-white shadow-[20px_-5px_20px_-5px]"
                />
            

            </motion.div>

            <div className="lg:w-[50%] flex flex-col">
                <div className="lg:text-4xl text-3xl font-semibold w-[50%]">
                    Become an 
                    <HighlightText text={" Instructor"}/>
                </div>

                <p className="font-medium text-[16px] w-[80%] text-navyblue-200 mb-12">
                    Instructors from around the world teach millions of students on Torned Education,
                    we provide the tools and skills to teach what you love.
                </p>

               <div className="w-fit">
               <CTAButton active={true} linkto={'/signup'}>
                    <div className="flex flex-row gap-2 items-center">
                        Start Learning Today
                        <FaArrowRight/>
                    </div>
                </CTAButton>
               </div>

            </div>

            </div>
        </div>
    )
}
export default InstructorSection;