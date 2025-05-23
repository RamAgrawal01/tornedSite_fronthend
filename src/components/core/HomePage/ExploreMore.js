import React from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import { useState } from 'react';
import CourseCard from './CourseCard';

const tabName = [
    'Free',
    'High School',
    'Most popular',
    'Skills paths',
];

const ExploreMore = () => {

    const[currentTab , setCurrentTab] = useState(tabName[0]);
    const[courses , setCourses] =  useState(HomePageExplore[0].courses);
    const[currentCard , setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course)=>course.tag===value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return(
        <div>
      {/* Explore more section */}
      <div>
        <div className="text-3xl lg:text-4xl font-semibold text-center my-10">
          Unlock the
          <HighlightText text={" Power of yourSelf"} />
          <p className="text-center text-navyblue-200 text-base lg:text-lg font-semibold mt-3">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex lg:gap-5  -mt-5 mx-auto lg:w-max bg-navyblue-700 text-navyblue-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
        {tabName.map((ele, index) => {
          return (
            <div
              className={` lg:text-[16px] text-[10px] sm:text-[16px] flex flex-row items-center lg:gap-2 ${currentTab === ele
                ? "bg-richblack-800 text-richblack-5  font-semibold"
                : "text-white "
                } lg:px-7 sm:px-11 px-5 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
              key={index}
              onClick={() => setMyCards(ele)}
            >
              {ele}
            </div>
          );
        })}
      </div>

      <div className="h-[25px] block lg:h-[200px]"></div>

      {/* Cards Group */}
      <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              cardData={ele}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ExploreMore;