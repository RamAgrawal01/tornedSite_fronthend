import React from 'react'
import knowYourProgress from "../../../assets/Images/Physics Notebook Cover (1).png"
import compareWithOthers from "../../../assets/Images/Compare_with_others.png"
import planYourLesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from './CTAButton'

const LearningLanguageSection =() => {
    return(
        <div className='mt-[60px] mb-20'>
            <div className='flex flex-col gap-5 items-center'>

                <div className='lg:text-4xl text-3xl font-semibold text-center'>
                    Your Swiss Kife for<span> </span>
                    <span className='gradient_color2'>Learning any Subject</span>
                </div>

                <div className='text-center text-navyblue-600 mx-auto text-base mt-3 font-semibold w-[70%]'>
                    Using spin making learning multiple Subject easy with 20+ Subjects realitics
                    voice over , progress tracking custom schedule and more.
                </div>

                {/* Image section */}
                <div className='flex flex-col lg:flex-row items-center justify-center'>
                    <img 
                        src={knowYourProgress}
                        alt='knowYourProgressImage'
                        className='object-contain lg:-mr-32'
                        />

                    <img 
                        src={compareWithOthers}
                        alt='knowYourProgressImage'
                        className='object-contain'
                        />

                    <img 
                        src={planYourLesson}
                        alt='knowYourProgressImage'
                        className='object-contain lg:-ml-36'
                        />

                </div>

                <div className='w-fit translate-y-[-40%]'>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                </div>

            </div>
        </div>
    )


}
export default LearningLanguageSection;
