import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import ModalButton from '../../../../common/ModalButton';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { setCourse } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
const PublishCourse = () => {

    const{register , handleSubmit , setValue , getValues} = useForm();
    const{course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);
    const[loading , setLoading]= useState(false);
    const dispatch = useDispatch();

    //first render set value public if 
    useEffect(()=>{
        if(course?.status===COURSE_STATUS.PUBLISHED){
            setValue("public",true);
        }
    })

    const goBack = () => {
        dispatch(setStep(2));
    }

    const goToCourses =() => {
        dispatch(resetCourseState())
    }

    const handleCoursePublish = async() =>{
        // check if form has been updated or not
    if (
        (course?.status === COURSE_STATUS.PUBLISHED &&
          getValues("public") === true) ||
        (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
      )
      {
        //no updation in form //no need to call API then we will show you cours
        goToCourses();
        return;
      }
      //if form updated :
      const formData = new FormData();
      formData.append("courseId",course._id);
      //if tick is mark on public then it will set published otherwise draft
      const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
      formData.append("status",courseStatus);
      //API CALL
      setLoading(true);
      const result = await editCourseDetails(formData , token);

      if(result ){
        goToCourses();
      }

      setLoading(false);
    }

    const publishCourseHandler = () => {
        handleCoursePublish()
    }
 
    return(
        <div className='rounded-md border-[1px] border-navyblue-700 bg-navyblue-900 p-6'>
            <h1 className='text-2xl font-semibold text-orange-200'>Publish Course</h1>
            <form onSubmit={handleSubmit(publishCourseHandler)}>
                <div className='my-6 mb-8'>
                    <label htmlFor='public'>
                    <input
                    type="checkbox"
                    id='public'
                    {...register("public")}
                    className='border-pink-200 h-4 w-4 rounded-full bg-navyblue-500 text-navyblue-300 focus:ring-2 focus:ring-navyblue-50'
                    />
                   <span className='ml-2 text-xl text-navyblue-300'>Make this Course as public</span> </label>
                </div>

                <div className='ml-auto flex max-w-max items-center gap-x-4'>
                    <button
                    className='cursor-pointer rounded-lg font-semibold py-2 px-5 bg-pink-200 text-richblack-900 hover:bg-richblack-900 hover:text-pink-200'
                    disabled={loading}
                    onClick={goBack}>
                        Back
                    </button>

                    <ModalButton
                    disabled={loading}
                    text="Publish"/>
                </div>
            </form>
        </div>
    )
}
export default PublishCourse;