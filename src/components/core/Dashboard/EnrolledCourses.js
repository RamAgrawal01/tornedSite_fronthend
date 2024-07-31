import React from 'react'
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from "@ramonak/react-progress-bar";
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../../common/Loader';
import { useNavigate } from 'react-router-dom';
const EnrolledCourses = () => {

    const {token}  = useSelector((state)=>state.auth)
    const [enrolledCourses , setEnrolledCourses] = useState(null);
    const [loading , setLoading] = useState(true);
    const navigate = useNavigate();

    const getEnrolledCourses = async () => {
      try {
          const res = await getUserEnrolledCourses(token);
          // console.log("Response of enrolled course: ", res);
          setEnrolledCourses(res);
      } catch (err) {
          console.log("Unable to fetch enrolled courses: ", err);
      } finally {
          setLoading(false); // ensure loading is set to false after the fetch
      }
  };

  useEffect(() => {
      getEnrolledCourses();
  }, [token]);

  useEffect(() => {
      if (!loading) {
          console.log("Enrolled courses in frontend: ", enrolledCourses);
      }
  }, [loading, enrolledCourses]);



    return(

      <>
       
      <h1 className='text-4xl text-navyblue-50 text-center sm:text-left'>Enrolled Courses</h1>
      <div className='my-8 text-navyblue-50'>
        {/* Heading */}
        <div className='flex rounded-t-2xl bg-navyblue-800'>
          <p className='w-[45%] px-5 py-3'>Course Name</p>
          <p className='w-1/4 px-2 py-3'>Duration</p>
          <p className=' px-2 py-3'>Progress</p>
        </div>

        {/* Loading */}
        {!enrolledCourses || loading && (
          <div>
            <Loader />
          </div>
        )}

        {enrolledCourses && enrolledCourses.map((course, index , arr) => (
          <div key={index}
          className='flex flex-col sm:flex-row sm:items-center border border-navyblue-700'>
            <div className='flex sm:w-[45%] cursor-pointer items-center gap-4 px-5 py-3'
            onClick={()=>{
              navigate(
                `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
              )
            }}>
              <img className='h-[75px] w-[88px] rounded-lg object-cover' src={course.thumbnail} alt={`${course.courseName} thumbnail`
            } />
              <div className='flex max-w-xs flex-col gap-2'>
                <p className='font-semibold text-orange-200'>{course.courseName}</p>
                <p className='text-base text-navyblue-200'>{course.courseDescription}</p>
              </div>
            </div>

            <div>
              {course?.totalDuration}
            </div>

            <div>
              <p>Progress: {course.progressPercentage || 0}%</p>
              <ProgressBar
                completed={course.progressPercentage || 0}
                height="8px"
                isLabelVisible={false}
              />
            </div>
          </div>
        ))}
      </div>
 
      </>
    )
}
export default EnrolledCourses;