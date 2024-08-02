import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../components/common/motionFrameVarients";
import HighlightText from "../components/core/HomePage/HighlightText";
import Img from "../components/common/Img";
import AboutImage1 from"../assets/Images/aboutus1.webp"
import AboutImage2 from"../assets/Images/resize-1720457287140710463aboutImage3.jpg"
import AboutImage3 from"../assets/Images/aboutus3.webp"
import Quote from "../components/core/AboutPage/Quote";
import foundingImage from "../assets/Images/foudingstory2.jpeg"
import StatsComponent from "../components/core/AboutPage/StatsComponent";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
const AboutUs =()=> {
    return(
        <div className="">
            {/* SECTION 1 */}
            <section className="bg-navyblue-800">
                <div className="mx-auto relative flex flex-col justify-between gap-10 text-center w-11/12 max-w-maxContent text-white">
                 <motion.header
                 className="py-20 text-4xl mx-auto font-semibold lg:w-[70%]">
                <motion.p
                //  animate={{ x: 100 }}
                //  transition={{ ease: "easeOut", duration: 2 }}
                variants={fadeIn('down',0.1)}
                initial='hidden'
                whileInView={'show'}
                viewport={{once:false,amount:0.1}}>
                    Driving Innovation in Online Education for 

                    <HighlightText text={" Brighter Future"} />

              

                 </motion.p>

                 <motion.p
                 variants={fadeIn('up',0.1)}
                 initial='hidden'
                 whileInView={'show'}
                 viewport={{once:false,amount:0.1}}
                 className="mx-auto mt-3 text-center text-base font-medium text-orange-100 lg:w-[95%]"
                 >
                  Torned Education is at the forefront of driving innovation in online
                 education. We're passionate about creating a brighter future by
                offering cutting-edge courses, leveraging emerging technologies,
                 and nurturing a vibrant learning community.   
                    </motion.p>

                    
                 </motion.header>

                <div className="lg:h-[150px] sm:h-[70px]">
                <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5 ">
                    <Img src={AboutImage1} />
                    <Img src={AboutImage2} />
                    <Img src={AboutImage3}  />
                 </div>
                </div>
                </div>
            </section>

            {/* SECTION 2 */}
            <section className="border-b border-navyblue-700 ">
                <div className="mx-auto lg:mt-[10rem] mt-[5rem] mb-[2rem] flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
                
                    <Quote/>
                </div>
                
               
            </section>

            {/* SECTION 3 */}
            <section>
                <div className="flex flex-col w-11/12 max-w-maxContent justify-between mx-auto gap-10
                text-navyblue-200">
                       {/* founding story box */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                        {/* founding story left box */}
                        <motion.div 
                        variants={fadeIn('right',0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{once:false,amount:0.1}}
                        className="flex flex-col gap-10 lg:w-[50%] my-20">
                            <h1 className="text-4xl font-semibold lg:w-[70%]">Our Founding Story</h1>

                            <p className="text-base font-medium  lg:w-[95%]">
                                Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators,
                                technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities 
                                in a rapidly evolving digital world. </p>

                             <p className="text-base font-medium  lg:w-[95%]" >
                                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed 
                                that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform
                                 that could bridge these gaps and empower individuals from all walks of life to unlock their full potential. </p>
                        </motion.div>

                           {/* founding story Right box */}
                        <motion.div
                        variants={fadeIn('left', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}>
                            <img
                             src={foundingImage} 
                             alt="FoundingImage"
                             style={{
                                 borderRadius:"50%",
                                 width: '320px',  // Adjust the width and height as needed
                                 height: '320px',
                                
                             }}
                             className="shadow-[0_0_50px_0] shadow-[#FC6767]"
                            
                            />
                        </motion.div>

                        <div>

                        </div>



                        
                    </div>

                    {/* vision and mission wala box */}
                    <div className="flex lg:flex-row flex-col items-center lg:gap-10 justify-between">
                        {/* vision wala left box */}
                        <div className="my-20 flex lg:w-[40%] flex-col gap-10">
                            <h1 className="text-4xl font-semibold lg:w-[70%]">Our Vision</h1>
                            <p className="text-base font-medium lg:w-[95%]">
                                With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop 
                                a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                        </div>

                        {/* Mission wala right box */}
                        <div className="my-16 flex flex-col gap-10 lg:w-[40%]">
                            <h1 className="text-4xl font-semibold lg:w-[70%]">Our Mission</h1>
                            <p className="text-base font-medium lg:w-[95%]">
                                With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop 
                                a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* SECTION 4 */}
            <section>
                <StatsComponent/>
            </section>

            {/* SECTION 5 */}
            <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
                
                <LearningGrid/>
                <ContactFormSection/>
            </section>

            {/* SECTION 6 */}
            <section>
            <h2 className="text-center lg:text-4xl text-3xl font-semibold text-white my-5">
            Review from Other Learners</h2>
            <ReviewSlider/>
            </section>

             {/* SECTION 7 */}
             <div>
               <Footer/>
               </div>


          

        </div>
    )
}
export default AboutUs;