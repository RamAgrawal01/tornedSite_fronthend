import React from "react";
import CTAButton from "./CTAButton";
import HighlightText from "./HighlightText";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const PCMAnimation = ({
    position , heading,subHeading , ctabtn1 , ctabtn2 , 
    animationBlock , backgroundGradient , animationColor
}) => {
    return(
        <div className={`flex ${position} my-20 justify-between lg:gap-10 gap-10`}>

            {/* section 1 */}
            <div className="w-[100%] lg:w-[47%] flex flex-col gap-8">
                {heading}
                <div className="text-navyblue-300 text-base w-[85%] -mt-3">
                    {subHeading}
                </div>

                <div className="flex gap-7 mt-7">
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="flex gap-2 items-center">
                            {ctabtn1.btnText}
                            <FaArrowRight/>

                        </div>
                
                    </CTAButton>

                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
        
                            {ctabtn2.btnText}
                        </CTAButton>
             </div>
             </div>
            {/* section 2 */}
            <div className="h-fit animationBorder flex text-[10px] w-[100%]
            rounded-xl  py-4 sm:text-sm leading-[18px] sm:leading-6 relative lg:w-[470px]">
              {backgroundGradient}

              <div className="text-center flex flex-col w-[10%] text-navyblue-400
              font-bold">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
              </div>

              <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${animationColor} pr-1`}
        >
          <TypeAnimation
            sequence={[animationBlock, 3000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
                whiteSpace: "pre-line",
                display: "block",
              }}
              omitDeletionAnimation={true}
          />
        </div>

            

                    

                </div>

         

        </div>
    )
}
export default PCMAnimation