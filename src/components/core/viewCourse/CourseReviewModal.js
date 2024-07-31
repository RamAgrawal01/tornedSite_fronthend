import React, { useEffect } from 'react';
import { GiSplitCross } from "react-icons/gi";
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import ReactStars from "react-rating-stars-component";
import ModalButton from '../../common/ModalButton';
import { createRating } from '../../../services/operations/courseDetailsAPI';

const CourseReviewModal = ({ setReviewModal }) => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { courseEntireData } = useSelector((state) => state.viewCourse);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    }, [setValue]);

    const ratingChange = (newRating) => {
        setValue("courseRating", newRating);
    }

    const onSubmit = async (data) => {
        await createRating({
            courseId: courseEntireData._id,
            rating: data.courseRating,
            review: data.courseExperience
        }, token);

        setReviewModal(false);
    }

    return (
        <>
           <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
                <div className='my-10 w-11/12 max-w-[700px] rounded-lg border border-navyblue-400 bg-navyblue-800'>
                    {/* modal header */}
                    <div className='flex items-center justify-between rounded-t-lg bg-navyblue-700 p-5 '>
                        <p className='text-xl font-semibold text-navyblue-50'>Add Review</p>
                        <button onClick={() => setReviewModal(false)}>
                            <GiSplitCross className='text-2xl text-navyblue-50' />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className='p-6'>

                        <div className='flex items-center justify-center gap-x-4'>
                            <img
                                src={user?.image}
                                alt='user image'
                                className='aspect-square w-[50px] rounded-full object-cover'
                            />

                            <div className='flex-col'>
                                <p className='font-semibold text-navyblue-50 capitalize'>{user?.firstName} {user?.lastName}</p>
                                <p className='text-sm text-navyblue-50'>Posting Publicly</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}
                            className='mt-6 flex flex-col items-center'>

                            <ReactStars
                                count={5}
                                onChange={ratingChange}
                                size={35}
                                activeColor="#ffd700"
                            />

                            {/* textarea */}
                            <div className='flex w-11/12 flex-col space-y-2'>
                                <label htmlFor='courseExperience'
                                className='text-base text-navyblue-50'>Add your Experience</label>
                                <textarea
                                    id="courseExperience"
                                    placeholder='Add your Comments'
                                    {...register("courseExperience", { required: true })}
                                    className="input-style min-h-[130px] resize-x-none"
                                />
                                {
                                    errors.courseExperience && (
                                        <span className='tracking-wide text-pink-100'>
                                            Please Add your Comment
                                        </span>
                                    )
                                }
                            </div>

                            {/* Buttons */}
                            <div className='mt-5 flex w-11/12 justify-end gap-x-2'>
                                <button type="button" onClick={() => setReviewModal(false)}>
                                    Cancel
                                </button>

                                <ModalButton
                                    text="Save"
                                    type="submit"
                                />
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}
export default CourseReviewModal;

