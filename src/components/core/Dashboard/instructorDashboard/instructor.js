// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';
import { Link } from "react-router-dom";
import React, { useInsertionEffect } from 'react'

import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import Loader from "../../../common/Loader"
import InstructorChart from './instructorchart';
import Img from "../../../common/Img";


const InstructorDashboard = () => {

    const {token} = useSelector((state)=>state.auth);
    const{user} = useSelector((state)=>state.profile);
    // console.log("Token: ",token);
    const [loading , setLoading] = useState(false)
    const [instructorData, setInstructorData] = useState([]);
    

useEffect(()=>{
   const getCourseDataWithStats = async() => {
        setLoading(true);
        const result = await getInstructorData(token);
        console.log("Instructor Dashboard data : ",result)

        if(result) {
            setInstructorData(result.courses);
        }
        setLoading(false)
    }
    getCourseDataWithStats()
},[]) 

    const totalAmount = instructorData?.reduce((acc,curr)=>acc + curr.totalAmountGenerated,0);
    const totalStudents = instructorData?.reduce((acc,curr)=>acc + curr.totalStudentsEnrolled,0);
    // console.log("Total amount : ",totalAmount);
    // console.log("Total students enrolled: ",totalStudents)

    

    return (
        <div>
          <div className='space-y-2'>
            <h1 className='text-2xl font-bold text-navyblue-50 text-center sm:text-left'>Hi {user?.firstName}
              <span className="themeHi ml-2">👋</span>
            </h1>
            <p className='font-medium text-navyblue-200 text-center sm:text-left'>Let's Start Something New</p>
          </div>
    
          <div>
            {loading ? (
              <div><Loader/></div>
            ) : instructorData?.length > 0 ? (
              <div className="">
                <div className="flex flex-col gap-7 ">
                  <div className='my-4 flex flex-col sm:h-[500px] sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8'>
                    {/* Rendering the chart/graph */}
                    {totalAmount > 0 || totalStudents > 0 ? (
                      <InstructorChart instructorData={instructorData} />
                    ) : (
                      <div className="flex-1 rounded-md bg-navyblue-800 p-6">
                        <p className="text-lg font-bold text-navyblue-50">Visualize</p>
                        <p className="mt-4 text-xl font-medium text-navyblue-100">Not Enough Data To Visualize</p>
                      </div>
                    )}
                    {/* Right column total statistics */}
                    <div className='flex min-w-[320px] flex-col rounded-lg bg-navyblue-800 p-6 gap-6'>
                      <h1 className='text-2xl font-bold text-orange-200 underline mb-4'>Statistics</h1>
                      <div>
                        <h2 className='text-lg text-navyblue-200'>Total Courses</h2>
                        <p className='text-3xl font-semibold text-navyblue-50'>{instructorData.length}</p>
                      </div>
                      <div>
                        <h2 className='text-lg text-navyblue-200'>Total Students</h2>
                        <p className='text-3xl font-semibold text-navyblue-50'>{totalStudents}</p>
                      </div>
                      <div>
                        <h2 className='text-lg text-navyblue-200'>Total Income</h2>
                        <p className='text-3xl font-semibold text-navyblue-50'>{totalAmount}</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md bg-navyblue-800">
                    <h1 className="text-2xl p-4 font-bold text-orange-200">Individual Course Information</h1>
                    {/* Render all courses */}
                    <div className="-mt-2">
                      <Swiper
                        slidesPerView={1}
                        centeredSlides={false}
                        spaceBetween={5}
                        loop={true}
                        grabCursor={true}
                        keyboard={{ enabled: true }}
                        breakpoints={{
                          769: {
                            slidesPerView: 2,
                          },
                          1024: {
                            slidesPerView: 3,
                            slidesPerGroup: 1,
                          }
                        }}
                        scrollbar={true}
                        navigation={true}
                        pagination={{ clickable: true }}
                        modules={[Keyboard, Scrollbar, Navigation, Pagination]}
                        className="mySwiper"
                      >
                        {instructorData.map((course, index) => (
                          <SwiperSlide key={index}>
                            <div className="sm:px-4 px-6 p-2 ">
                              <Link to={`/dashboard/instructor/${course._id}`}>
                                <div className="flex flex-col gap-2 border border-navyblue-600 bg-navyblue-700 p-3 text-[15px] text-navyblue-50 min-h-[180px] max-h-[500px] rounded-xl w-[360px]">
                                  <Img
                                    src={course.courseThumbnail}
                                    alt={course.courseName}
                                    className="h-[200px] w-full rounded-2xl object-cover"
                                  />
                                  <div className="w-full">
                                    <p className="text-sm font-medium text-navyblue-100">{course.courseName}</p>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <p className="text-[15px] font-medium text-navyblue-200">{course.totalStudentsEnrolled} Students</p>
                                    <p className="text-[15px] font-medium text-navyblue-200">|</p>
                                    <p className="text-[15px] font-medium text-navyblue-200">Rs. {course.courseAmount}</p>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p>No course</p>
            )}
          </div>
        </div>
      );
    };
    
    export default InstructorDashboard;