import React, { useEffect } from 'react'
import { buyCourse } from '../services/operations/studentFeaturesAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import { useState } from 'react';
import GetAvgRating from '../utils/avgRating';
import Loader from '../components/common/Loader';
import Error from './Error';
import ConfirmationModal from '../components/common/confirmationModal';
import RatingStars from '../components/common/RatingStars';
import { GiReturnArrow } from "react-icons/gi";
import { CiCalendarDate } from "react-icons/ci";
import { formattedDate } from '../utils/dateFormatter';
import { FaLanguage } from "react-icons/fa";
import CoursePurchasingCard from '../components/core/courseDetails/CoursePurchasingCard';
import CourseAccordionBar from '../components/core/courseDetails/CourseAccordionBar';
import Footer from "../components/common/Footer"
import { MdOutlineVerified } from 'react-icons/md'
import Img from '../components/common/Img';

const CourseDetails = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.auth);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [averageReviewCount, setAverageReviewCount] = useState(0);
  const [isActive, setIsActive] = useState([]);
  const [totalNumberOfLectures, setTotalNumberOfLectures] = useState(0);

  // Fetch course data on component mount
  useEffect(() => {
    const getCourseData = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        console.log("Fetched course details:", result); // Check the fetched data
        setCourseData(result);
      } catch (err) {
        console.log("Could not fetch course details", err);
      }
    };
    getCourseData();
  }, [courseId]);

  // Calculate average rating
  useEffect(() => {
    if (courseData) {
      const count = GetAvgRating(courseData?.data?.courseDetails?.ratingAndReviews);
      setAverageReviewCount(count);
    }
  }, [courseData]);

  // Count number of lectures
  useEffect(() => {
    if (courseData) {
      let lectures = 0;
      courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length || 0;
      });
      setTotalNumberOfLectures(lectures);
    }
  }, [courseData]);

  // Extract course data safely
  const courseDetails = courseData?.data?.courseDetails;
  if (!courseDetails) {
    return <div><Loader /></div>; // or any other fallback UI
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
    tag
  } = courseDetails;

  const handleActive = (id) => {
    setIsActive(!isActive.includes(id)
      ? isActive.concat(id)
      : isActive.filter((e) => e !== id));
  };

  // Buy Course Handler
  const handleBuyCourse = () => {
    if (token) {
      const coursesId = [courseId];
      buyCourse(token, coursesId, user, navigate, dispatch);
      return;
    }

    setConfirmationModal({
      text1: "You are not logged in",
      text2: "Please Login to purchase the course",
      buttonText: "Login",
      button2Text: "Cancel",
      buttonHandler: () => navigate("/login"),
      button2Handler: () => setConfirmationModal(null),
    });
  };

  if (loading || !courseData) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!courseData.success) {
    return (
      <div>
        <Error />
      </div>
    );
  }
  
  

    return(
        <>
        {/**********************SECTION UPPER********** */ }
        <div className={'relative w-full bg-navyblue-900 '}>
            {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
            <div className='mx-auto min-h-[450px] grid max-w-maxContentTab py-8 lg:mx-0 lg:justify-items-start
            lg:py-0 xl:max-w-[810px]'>
                {/* Go back button */}
                <div className='mb-5 lg:mt-10 lg:mb-0 z-[100]'>
                 <GiReturnArrow className='w-10 h-10 text-yellow-100 hover:text-yellow-50 cursor-pointer' />
                </div>
          

            {/* COurse data */}
           <div className='flex flex-col mb-5 justify-center gap-4 py-5 text-lg text-navyblue-50'>
            <p className='text-4xl font-bold text-navyblue-50 sm:text-[42px]'>{courseName}</p>
            <p className='text-navyblue-200'>{courseDescription}</p>

            <div className='flex flex-wrap items-center gap-4'>
                <span>{averageReviewCount}</span>
                <RatingStars Review_Count={averageReviewCount} Star_Size={24}/>
                <span className='text-orange-200'>{`${ratingAndReviews.length} Review`}</span>
            </div>

            <p>{`Number of Students Enrolled : ${studentsEnrolled.length}`}</p>
            <p className='capitalize'>Created By: <span className=' underline leading-10 text-orange-200'>{instructor.firstName}{"  "}{instructor.lastName}</span></p>

            <div className='flex flex-wrap gap-5 text-lg'>
                <p className='flex items-center gap-2'><CiCalendarDate /> Created at {formattedDate(createdAt)} </p>
                <p className='flex items-center gap-2'><FaLanguage /> Hindi</p>
            </div>

          </div>

           {/* will appear only for small size */}
           <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">Rs. {price}</p>
              <button className="yellowButton" >Buy Now</button>
              <button  className="blackButton">Add to Cart</button>
            </div>
          </div>

          {/* Floating Course Card */}
            <div className='right-[1.5rem] top-[60px] mx-auto hidden lg:absolute min-h-[600px] lg:block w-1/3 max-w-[410px] translate-y-24 '>
                <CoursePurchasingCard
                course = {courseData?.data?.courseDetails}
                setConfirmationModal ={setConfirmationModal}
                handleBuyCourse = {handleBuyCourse}
                />
            </div>
          </div>
        </div>


  <div className='mx-auto lg:w-[1260px] box-content px-4 text-navyblue-50'>
    <div className='mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]'>
           {/**********************WHAT YOU WILL LEARN********** */ }
          <div className='my-8 border border-navyblue-700 p-8'>
            <p className='text-3xl font-semibold'>What You will learn</p>
            <div className='mt-4'>
            {whatYouWillLearn && (
                whatYouWillLearn.split('\n').map((line, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <p className="font-bold">{index + 1}.</p>
                    <p className="ml-2">{line}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* tags */}
            <div className='flex flex-col lg:flex-row gap-4'>
              <p className='text-xl font-bold'>Tags</p>
              <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                {
                  tag && tag.map((item,index)=>(
                    <p key={index} className='bg-yellow-200 p-[2px] text-black rounded-full text-center font-semibold'>
                      {item}
                    </p>
                  ))
                }
              </div>
            </div>


          {/* Coure COntent */}
          <div className='max-w-[830px] mt-9'>
            <div className='flex flex-col gap-3'>
              <p className='text-[28px] font-semibold'>Course Content: </p>
         

            <div className='flex flex-wrap justify-between gap-2'>
            <div className='flex gap-4'>
              <span>{`${courseContent.length} sections(s)`}</span>
              <span>{`${totalNumberOfLectures} lectures`}</span>
              <span>{`${courseData?.data?.totalDuration} total Time`}</span>
            </div>

            <button
            className='text-yellow-25'
            onClick={()=>setIsActive([])}>
              Collapse All Section
            </button>
            </div>
            </div>

        {/* Course Details Accordation - section and subsection */}
        <div className='py-4'>
          {courseContent?.map((section , index)=>(
            <CourseAccordionBar
            section = {section}
            key ={index}
            isActive={isActive}
            handleActive={handleActive}
            />
          ))}
        </div>

        {/* Author Details */}
        <div className='mb-12 py-4'>
          <p className='text-[28px] font-semibold'>Author</p>

          <div className='flex items-center gap-4 py-4'>
            <Img
            src={instructor.image}
            alt="Author"
            className="h-14 w-14 rounded-full object-cover"
            />

<p className='text-lg capitalize flex items-center gap-2 font-semibold'>{`${instructor.firstName}`}{" "}{`${instructor.lastName}`}

<span><MdOutlineVerified className='w-5 h-5 text-[#25b95b]' /></span>
</p>
          </div>

          <p className='text-navyblue-100'>{`Bio:  ${instructor?.additionalDetails?.about}`}</p>

        </div>

          </div>
    </div>
   </div>
       
         


        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        
        <Footer/>
        </>
    )
}
export default CourseDetails;