import { color } from 'framer-motion';
import React from 'react';
import { HiUser } from 'react-icons/hi';
import { ImTree } from 'react-icons/im';


const CourseCard = ({cardData , currentCard ,setCurrentCard }) => {
    return(
        <div className={`w-[360px] lg:w-[30%] sm:w-[25%] ${currentCard === cardData?.heading
            ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
            : "bg-navyblue-700"
            }  text-orange-300 h-[300px] box-border cursor-pointer`}
          onClick={() => setCurrentCard(cardData?.heading)}>
            <div className='border-b-[2px] border-navyblue-400 border-dashed h-[80%]
            p-6 flex flex-col gap-3'>
                <div className={`${currentCard === cardData?.heading && "text-navyblue-700"} font-semibold
                lg:text-[20px]`}>
                    {cardData?.heading}

                </div>

                <div className={`${currentCard===cardData.heading
                    ? "text-navyblue-700" : "text-orange-300"
                } lg:text-[1.2rem] sm:text-[0.8rem]`}>{cardData.description}</div>
            </div>

            <div className={`flex justify-between ${currentCard===cardData?.heading
            ? "text-navyblue-700" : "text-orange-300"} px-6 py-3`}>
                <div className='flex items-center gap-2 lg:text-[1.2rem]'>
                <HiUser />
                <p>{cardData?.level}</p>
                </div>

                <div className='flex items-center gap-2 sm:text-[0.7rem] lg:text-[1.2rem]'>
                <ImTree />
                <p>{cardData?.lessionNumber}</p>
                </div>


            </div>

         
         

        </div>
    )
}
export default CourseCard;