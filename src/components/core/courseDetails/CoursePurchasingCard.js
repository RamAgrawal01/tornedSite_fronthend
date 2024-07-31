import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Img from '../../common/Img';
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import toast from 'react-hot-toast';
import copy from 'copy-to-clipboard';
import ACCOUNT_TYPE from '../../../utils/constants'
import { addToCart } from '../../../slices/cartSlice';
import ConfirmationModal from '../../common/confirmationModal';


const CoursePurchasingCard = ({course , setConfirmationModal , handleBuyCourse}) => {

    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const {
        thumbnail,
        price,
        _id: courseId,
      } = course

      const handleAddToCart = () => {
        if(user && user?.accountType === 'Instructor' ){
            toast.error("You are Instructor , you can't buy a course");
            return;
        }
        if(user && user?.accountType ==='Student'){
            dispatch(addToCart(course));
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
        
      }

      const handleShare = () => {
        copy(window.location.href);
        toast.success("Link copied to clipboard")
      }

    return(
        <>
        <div className='flex flex-col gap-4 rounded-2xl bg-navyblue-700 p-5 text-navyblue-50'>
            <Img
            src={thumbnail}
            alt={course?.courseName}
            className='max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full '
            />

            <div className='px-4'>
                <p className='space-x-3 pb-4 text-3xl font-semibold'>Rs. {price}</p>

                <div className='flex flex-col gap-4'>
                    <button className='yellowButton outline-none'
                    onClick={
                        user && course?.studentsEnrolled.includes(user?._id)
                        ? ()=> navigate("/dashboard/enrolled-courses") :
                        handleBuyCourse
                    }>
                        {user && course?.studentsEnrolled.includes(user?._id)
                        ? "Go to Course" : "Buy Now"}
                    </button>

                    {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
                        <button className='blackButton outline-none'
                        onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    )
                    
                    }
                </div>
                <p className='pb-3 pt-6 text-center text-sm text-navyblue-200'>5-Day Money-Back Gurantee</p>

                <div>
                    <p className='my-2 text-xl font-semibold'>Course Requirements: </p>

                    <div className='flex flex-col gap-2 text-sm text-caribbeangreen-50'>
                        {course?.instructions?.map((item,i)=>(
                            <p className='flex gap-2 items-center' key={i}>
                                 <BsFillCaretRightFill />
                                 <span>{item}</span>
                            </p>
                        ))}
                    </div>
                </div>

                <div className='text-center'>
                    <button className='mx-auto flex items-center gap-2 py-6 text-orange-300'
                    onClick={handleShare}>
                    <FaShareSquare size={15} /> Share
                    </button>
                </div>
            </div>

            {}
        </div>
        </>
    )
}
export default CoursePurchasingCard;