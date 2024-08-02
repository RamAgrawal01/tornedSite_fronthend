import React from 'react';
import { IoMdArrowDropdown } from "react-icons/io"
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import SubSectionAccordian from './SubSectionAccordian';

const CourseAccordionBar = ({section , isActive , handleActive}) => {

    const contentE1 = useRef(null)
    const [active , setAcitve] = useState(false)
    const [sectionHeight , setSectionHeight] = useState(0);

    useEffect(()=>{
        setAcitve(isActive?.includes(section._id))
    },[isActive])

    useEffect(()=>{
        setSectionHeight(active ? contentE1.current.scrollHeight:0)
    },[active])

    return(
    <div className="overflow-hidden bg-navyblue-700 hover:bg-navyblue-600 text-navyblue-50
    border border-solid border-navyblue-600 last:mb-0 duration-200">
        <div>
        <div className={`flex cursor-pointer items-start px-7 py-6 bg-opacity-20 justify-between transition-[0.3s]`}
        onClick={()=>{handleActive(section._id)}}>

            <div className='flex items-center gap-3'>
                <i className={isActive.includes(section._id) ? "rotate-180 duration-300" : "rotate-0 duration-300"}>
                <IoMdArrowDropdown size={25} />
                </i>

                <p>{section?.sectionName}</p>
            </div>

            <div className='space-x-4'>
                <span className='text-yellow-50'>
                    {`${section.subSection.length || 0} lecture(s)`}
                </span>
            </div>           
        </div>
        </div>

        {/* Subsection */}
        <div
        ref={contentE1}
        className={`relative h-0 overflow-hidden bg-navyblue-950 transition-[height] duration-[0.35s] ease-[ease]
        `}
        style={{height:sectionHeight}}>

            <div className='flex flex-col gap-2 px-7 py-6 font-semibold'>
                {section?.subSection?.map((subSec,index)=>(
                    <SubSectionAccordian subSec={subSec} key={index} />
                ))}
            </div>
        </div>

    </div>
    )
}
export default CourseAccordionBar;