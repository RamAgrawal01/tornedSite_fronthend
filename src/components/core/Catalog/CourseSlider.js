import React from 'react'
// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import {FreeMode } from 'swiper';
import Course_Card from './Course_Card'



const CourseSlider =({Courses}) => {

    return(
       <>
      {
        Courses?.length ? 
        (
            <Swiper
            slidesPerView={1}
            loop={true}
            spaceBetween={60}
            breakpoints={{
                1024:{slidesPerView:3}
            }}
            >
                {
                    Courses.map((course,index)=>(
                        <SwiperSlide key={index}>
                            <Course_Card Course={course} Height={"h-[250px]"} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        ) : 
        (<p>No Courses found</p>)
      }
       </>
    )
}
export default CourseSlider;