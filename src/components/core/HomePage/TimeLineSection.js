import React from 'react'
import { motion } from 'framer-motion';
import { fadeIn } from '../../common/motionFrameVarients';

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timeLineImage from "../../../assets/TimeLineLogo/istock-882318416_preview.gif";
const timeline =[
    {
        Logo: Logo1,
        heading: "Leadership",
        Description: "Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        Description: "Students will always be our top priority",
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        Description: "The ability to switch is an important skills",
    },

    {
        Logo: Logo4,
        heading: "Solve the problem",
        Description: "Code your way to a solution",
    },
];

const TimeLineSection =() => {
    return(
        <div>
            <div className='flex lg:flex-row flex-col gap-16 items-center'>

                <motion.div
                    variants={fadeIn('right',0.1)}
                    initial ='hidden'
                    whileInView={'show'}
                    viewport={{once:false,amount :0.1}}
                    className='w-full lg:w-[50%] flex flex-col gap-5'
                    >
                        {
                            timeline.map((element , index)=>{
                                return(
                                   <div className="flex gap-6" key={index}>
                                        <div className='w-[50px] h-[50px] bg-richblack-500 rounded-full flex items-center justify-center'>
                                            <img src={element.Logo} />
                                        </div>

                                        <div>
                                            <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                            <p className='text-base'>{element.Description}</p>
                                        </div>
                                   </div> 
                                )
                            })
                        }

                </motion.div>

                <motion.div
                 variants={fadeIn('left',0.1)}
                 initial ='hidden'
                 whileInView={'show'}
                 viewport={{once:false,amount :0.1}}
                 className=' relative '
                >
                    <img src={timeLineImage} alt='timeLineImage'
                    className='shadow-orange-500 mb-12 shadow-[20px_-5px_50px_-5px]  object-cover
                    h-fit scale-x-[-1] w-[600px]'/>

                    <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase  py-4
                    left-[50%] translate-x-[-50%] translate-y-[-100%] rounded-3xl'>
                        <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                            <p className='text-3xl font-bold'>5</p>
                            <p className='text-caribbeangreen-200 text-sm'>Years of Experience</p>
                        </div>

                        <div className='flex gap-5 items-center px-7'>
                        <p className='text-3xl font-bold'>100</p>
                        <p className='text-caribbeangreen-200 text-sm'>Types of Courses</p>

                        </div>

                    </div>


                </motion.div>

                



                

            </div>
        </div>
    )


}
export default TimeLineSection;