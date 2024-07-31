import React from 'react';
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { MdOutlineDelete } from "react-icons/md";
import { removeFromCart } from '../../../../slices/cartSlice';

const RenderCartCourses = () => {

    const {cart} = useSelector((state)=>state.cart);
    const dispatch = useDispatch()

    return(
        <div className='flex flex-1 flex-col'>
            {
             cart.map((course,index)=>(
                <div key={course._id}
                className={`flex w-full flex-wrap items-start justify-between text-white gap-6 ${index !== cart.length-1 && "border-b border-b-navyblue-400 pb-6"}`}>
                    <div className='flex flex-1 flex-col gap-4 xl:flex-row'>
                        <img src={course?.thumbnail} 
                        alt={course?.courseName}
                        className='h-[148px] w-[220px] rounded-lg object-cover' />
                        <div className='flex flex-col space-y-1'> 
                            <p className='text-lg font-medium text-navyblue-50'>{course?.courseName}</p>
                            <p className='text-[15px] text-navyblue-200'>Category: {course?.category?.name}</p>
                            <p className='text-sm text-navyblue-300 mt-2'>{course?.courseDescription}</p>
                            <div className='flex items-center gap-2'>
                                <span className='text-yellow-5'>4.8</span>
                                <ReactStars
                                    count = {5}
                                    value={course?.ratingAndReviews?.length}
                                    size= {20}
                                    activeColor ="#ffd700"
                                    edit={false}
                                    emptyIcons={<IoMdHeartEmpty />}
                                    fullIcon ={<IoMdHeart />}
                                />
                                <span className='text-navyblue-400'>{course?.ratingAndReviews?.length} Ratings</span>
                            </div>

                            <div className='flex flex-col items-end space-y-2'>
                                <button
                                onClick={()=>dispatch(removeFromCart(course._id))}
                                className='flex items-center gap-x-1 rounded-md border border-navyblue-600 bg-navyblue-700 py-3 px-[12px] text-pink-200'>
                                <MdOutlineDelete />
                                <span>Remove</span>
                                </button>

                                <p className='mb-6 text-3xl font-medium text-yellow-100'>Rs{course?.price}</p>
                            </div>
                        </div>
                    </div>
                </div>
             ))
            }
        </div>
    )
}
export default RenderCartCourses;