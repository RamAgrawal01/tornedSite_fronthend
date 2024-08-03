import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, } from './../components/common/motionFrameVarients';
import CTAButton from "../components/core/HomePage/CTAButton"
import Banner2 from "../assets/Images/Banner2.mp4"
import PCMAnimation from "../components/core/HomePage/PCMAnimation";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";
import { MdOutlineRateReview } from 'react-icons/md'
import CatalogModal from "../components/core/Catalog/CatalogModal";
    // background random images
    import backgroundImg10 from '../assets/Images/random bg img/coding bg10.jpg'
    import backgroundImg111 from '../assets/Images/random bg img/coding bg11.jpg'
    import backgroundImg12 from "../assets/Images/random bg img/coding bg 12.jpg"
    import backgroundImg13 from "../assets/Images/random bg img/coding bg 13.jpg"
    import backgroundImg14 from "../assets/Images/random bg img/coding bg 14.jpg"
    import backgroundImg15 from "../assets/Images/random bg img/coding bg 15.jpg"
    import backgroundImg16 from "../assets/Images/random bg img/coding bg 16.jpg"
    import backgroundImg17 from "../assets/Images/random bg img/coding bg 17.jpg"
    import backgroundImg18 from "../assets/Images/random bg img/coding bg 18.jpg"
    import backgroundImg19 from "../assets/Images/random bg img/coding bg 19.jpg"
    

const Home = () => {




const randomImges = [
    
    backgroundImg10,
    backgroundImg111,
    backgroundImg12,
    backgroundImg13,
    backgroundImg14,
    backgroundImg15,
    backgroundImg16,
    backgroundImg17,
    backgroundImg18,
    backgroundImg19,
];

const [backgroundImg, setBackgroundImg] = useState(null);
const [catalogModal , setCatalogModal] = useState(false);

    useEffect(() => {
        const bg = randomImges[Math.floor(Math.random() * randomImges.length)]
        setBackgroundImg(bg);
    }, [])

    return (
     <React.Fragment>
           <div>

{/* background random image */}
<div>
    
                <div className="w-full  h-[450px] md:h-[550px] absolute  left-0 opacity-[0.4] overflow-hidden object-cover ">
                    <img src={backgroundImg} alt="Background"
                        className="w-full h-full object-cover  "
                    />

                   
                </div>
            </div>
            
            {/* //******************SECTION 1****************** */}
            <div className="relative mx-auto translate-y-[80px] flex flex-col w-11/12 max-w-maxContent items-center text-white 
            justify-center">
                <Link to={"/signup"}>
                    <div className="group z-0  p-1 mx-auto rounded-full bg-navyblue-800 font-bold text-navyblue-200
                    tansition-all duration-200 hover:scale-95 w-fit">
                        <div className="flex items-center gap-2 rounded-full px-10 py-[5px]
                        transition-all duration-200 group-hover:bg-navyblue-900">
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>


                </Link>

                <motion.div
                        variants={fadeIn('left', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}
                        className='text-center text-3xl lg:text-4xl font-semibold mt-7  '
                    >
                        Empower Your Future with
                        <HighlightText text={" Torned Education"} />
                    </motion.div>

                    <motion.div
                        variants={fadeIn('right', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}
                        className=' mt-4 w-[90%] text-center text-base lg:text-lg font-bold text-orange-300'
                    >
                        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                    </motion.div>

            <div className="flex gap-7 mt-8">
               <div className="cursor-pointer">
               <CTAButton active={true}  onClick={()=>setCatalogModal(true)}>
                    Learn More
                </CTAButton>
               </div>

                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>

            </div>


 {/* code section 1 */}
 <div className=" lg:mt-[10rem] sm:mt-[10rem]">
                <PCMAnimation
                position={"lg:flex-row flex-col"}
                heading={
                    <div className="lg:text-4xl text-3xl font-semibold">
                        Unlock Your 
                        <HighlightText text={" Potential Skills "}/>
                        with our Online Courses
                        </div>
                }
                subHeading={
                   <div className="text-orange-200 leading-7">
                     "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    </div>
                }
                ctabtn1={
                    {
                       btnText: "Try it yourself",
                       linkto : "/signup",
                       active : true, 
                    }
                }
                ctabtn2={
                    {
                       btnText: "Learn More",
                       linkto : "/login",
                       active : false, 
                    }
                }
                
            animationBlock={`a^2 – b^2 = (a – b)(a + b)\n(a + b)^2 = a^2 + 2ab + b^2\n(a – b)^2 = a^2 – 2ab + b^2\n(a^3 – b^3 = (a – b)(a^2 + ab + b^2)\n(a^3 + b^3 = (a + b)(a^2 – ab + b^2)\n(a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2bc + 2ca\n(a – b – c)^2 = a^2 + b^2 + c^2 – 2ab + 2bc – 2ca\n<example> x^2 + 5x + 6 \n =x^2 + 2x + 3x + 2.3\n =x(x+2) + 3(x+2)\n=(x+2) (x+3)`}
                animationColor={"text-yellow-50"}
                backgroundGradient={<div className="animationBlock1 absolute"></div>}

                
                />
            </div>

                    {/* video section */}
            <div className="mx-3 mt-5  lg:mt-[3rem] mb-12  shadow-[20px_-5px_50px_-5px] shadow-orange-300">
                <video
                muted 
                loop
                autoPlay
                className=" md:shadow-[20px_20px_rgba(255,255,255)] md:shadow-pure-greys-200 shadow-[13px_13px_rgba(255,255,255)]  shadow-orange-400
                lg:h-[35rem]"
                src="https://cdn.pixabay.com/video/2023/11/11/188710-883612324_large.mp4">
                    
                
                </video>
            </div>

           

            {/* code section 2 */}
            <div>
                <PCMAnimation
                position={"lg:flex-row-reverse flex-col"}
                heading={
                    <div className="lg:text-4xl text-3xl  font-semibold">
                        Unlock Your 
                        <HighlightText text={" Potential Skills "}/>
                        with our Online Courses
                        </div>
                }
                subHeading={
                   <div className="text-orange-200 leading-7">
                     "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    </div>
                }
                ctabtn1={
                    {
                       btnText: "Try it yourself",
                       linkto : "/signup",
                       active : true, 
                    }
                }
                ctabtn2={
                    {
                       btnText: "Learn More",
                       linkto : "/login",
                       active : false, 
                    }
                }
                
            animationBlock={`What are the possible subshells when n = 4?\nHow many orbitals are contained by each of these subshells?\nWhen n = 4, the l values that can be used are 0, 1, 2, and 3.\nThis means that the 4s, 4p, 4d, and 4f subshells are the four options.\nThe 4s subshell possesses 1 orbital and can retain up to 2 electrons.\nThe 4p subshell includes 3 orbitals and can retain up to 6 electrons`}
                animationColor={"text-pink-100"}
                backgroundGradient={<div className="animationBlock2 absolute"></div>}

                
                />
            </div>

                <div>
                    <ExploreMore/>
                </div>


            </div>

             {/* //******************SECTION 2****************** */}
                <div className="bg-navyblue-100 text-orange-600">
                <div className='homepage_background h-[310px]'>
                        <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                            <div className='h-[150px]'></div>
                            <div className='flex flex-row  gap-7 text-white '>
                                <CTAButton active={true} onClick={()=>setCatalogModal(true)} className="sm:hidden">
                                    <div className='flex items-center gap-3' >
                                        Explore Catalog
                                        <FaArrowRight />
                                    </div>
                                </CTAButton>
                                <CTAButton active={false} linkto={"/catalog/high-school"} className="sm:hidden">
                                    <div>
                                        Learn more
                                    </div>
                                </CTAButton>
                            </div>
                        </div>
                    </div>

                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between
                gap-7">

                    <div className="flex gap-5 mb-10 mt-[95px]">

                        <div className="text-3xl lg:text-4xl font-semibold w-[45%]">
                            Get the Skills You need For a <p> </p>
                            <span className="gradient_color2">  
                             Job that are in demand
                                </span>
                        </div>

                        <div className="flex flex-col gap-10 w-[40%] items-start">
                            <p className="text-[16px]">
                                The modern Torned Education dictates its own terms. Today , to be a 
                                competitive specialist requires more than professional skills.
                            </p>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div>
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>

                    </div>
                    <TimeLineSection/>
                    <LearningLanguageSection/>
                

                </div>

                
                </div>

                

              {/*Section 3 */}
              <div className='mt-14 w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-navyblue-950 text-white'>
                    <InstructorSection />

                    {/* Reviws from Other Learner */}
                    <h1 className="text-center text-3xl lg:text-4xl font-semibold mt-8 flex justify-center items-center gap-x-3">
                        Reviews from other learners <MdOutlineRateReview className='text-yellow-25' />
                    </h1>
                    <ReviewSlider />
                </div>

                {/*Footer */}
                <Footer />

            {catalogModal && <CatalogModal setCatalogModal={setCatalogModal}/>}
            </div >
     </React.Fragment>
    )
}
export default Home;