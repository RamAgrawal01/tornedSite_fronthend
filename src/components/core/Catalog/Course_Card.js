import React, { useEffect } from 'react'
import RatingStars from '../../common/RatingStars';
import { Link } from 'react-router-dom';
import GetAvgRating from '../../../utils/avgRating';
import { useState } from 'react';
import Img from '../../common/Img';

const Course_Card =({Course , Height}) => {

    const [averageReviewCount , setAverageReviewCount] = useState(0);

    useEffect(()=>{
        const count = GetAvgRating(Course.ratingAndReviews)
        setAverageReviewCount(count);
    },[Course]);
    // console.log("Course ki id : ",Course._id);
    return(
 <div className='hover:scale-[1.03] transition-all duration-200 z-50'>
    <Link to={`/courses/${Course._id}`}>
        <div>
            <div className='rounded-lg'>
                <Img src={Course?.thumbnail}
                    alt="Course Thumbnail"
                    className={`${Height} w-full rounded-xl object-cover`} />
            </div>

            <div className='flex flex-col gap-2 px-1 py-3'>
                <p className='text-xl text-navyblue-50'>{Course?.courseName}</p>
                <p className='text-sm text-navyblue-100'>{Course?.instructor?.firstName}{" "}{Course?.instructor?.lastName}</p>

                <div className='flex items-center gap-2'>
                    <span className='text-orange-200'>{averageReviewCount || 0}</span>
                    <RatingStars  Review_Count={averageReviewCount}/>
                    <span className="text-navyblue-400">{Course?.ratingAndReviews?.length}{" "}Rating</span>
                </div>
                <p className='text-xl text-navyblue-50'>Rs{" "}{Course?.price}</p>
            </div>
        </div>
         
    </Link>
 </div>
    )
}
export default Course_Card;