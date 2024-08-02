import React from 'react'

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';
import RatingStars from '../common/RatingStars';
import { apiConnector } from '../../services/apiConnector'
import { ratingsEndpoints } from '../../services/api'
import { useState } from 'react'
import { useEffect } from 'react'
import { FaStar } from 'react-icons/fa'
import Img from './Img'
import './ReviewSlider.css'


const ReviewSlider = () => {
    const [review, setReview] = useState([]);
    const [readMore  , setReadMore] = useState(false)
    const truncateWords = 15;

  
    useEffect(() => {
      const fetchAllReviews = async () => {
        const response = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);
        const { data } = response;
        // console.log("data of reviews and rating: ", data);
        if (data?.success) {
          setReview(data?.data);
        }
      };
      fetchAllReviews();
    }, []);
    console.log(review)
    
  
    return (
      <div className='text-white flex justify-center  '>
        <div className='my-[20px]  max-h-[maxContent] max-w-maxContentTab lg:max-w-maxContent w-10/12  '>
          <Swiper
            slidesPerView={1}
            centeredSlides={false}
            spaceBetween={1}
            loop={true}
            grabCursor={true}
            keyboard={{
              enabled: true,
            }}
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
            pagination={{
              clickable: true,
            }}
            modules={[Keyboard, Scrollbar, Navigation, Pagination]}
            className="mySwiper"
          >
            {review.map((review, index) =>{
                const fullReview = readMore   ? review.review : `${review.review.substring(0, 50)}...`;
              return (
                <SwiperSlide key={index}>
                  <div className='px-10 py-2 '>
                  <div className='flex flex-col gap-4 glass-bg p-3 text-[15px] text-navyblue-50 min-h-[180px]
                  max-h-[maxContent] rounded-xl w-[290px]'>
                    <div className='flex items-center gap-4'>
                      <Img
                        src= {review?.user?.image
                        ? review?.user?.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                        alt="profile dp"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className='flex flex-col'>
                        <h1 className='font-semibold text-navyblue-50 capitalize'>{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                        <h2 className='text-[12px] font-medium text-navyblue-300'>{`${review?.course?.courseName}`}</h2>
                      </div>
                    </div>
                    <p className='font-medium text-navyblue-50'>{fullReview}
                      <span className='text-orange-300' onClick={()=>setReadMore(!readMore)}>
                        {readMore ? "Read Less" : "Read More"}
                      </span>
                    </p>
                    <div className='flex items-center gap-3 justify-center'>
                      <h3 className='font-semibold text-yellow-50'>{review?.rating}</h3>
                      <RatingStars
                        count={5}
                        Review_Count={review.rating}
                        size={24}
                        edit={false}
                        activeColor="#ffd700"
              
                      />
                    </div>
                  </div>
                  </div>
                </SwiperSlide>
              )
            } )}
          </Swiper>
        </div>
      </div>
    );
  }
  
  export default ReviewSlider;