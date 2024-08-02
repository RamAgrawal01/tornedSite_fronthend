import React from 'react'
import { useForm } from 'react-hook-form';
import ModalButton from '../../../../common/ModalButton';
import { useState } from 'react';
import {  IoMdAddCircleOutline } from "react-icons/io";
import { MdSkipNext } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection } from '../../../../../services/operations/courseDetailsAPI';
import { updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';
const CourseBuilderForm = () => {

    const {register , handleSubmit , setValue , formState:{errors}}  = useForm();
    const [editSectionName , setEditSectionName]  = useState(null);
    const [loading , setLoading]  = useState(false)
    const {course } = useSelector((state)=>state.course)
    const {token} = useSelector((state)=>state.auth);

    const dispatch = useDispatch()

const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName","")
}

const goBack =() => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
}

const goNext =() => {
    if(course.courseContent.length===0){
        toast.error('Please add atleast one section')
        return;
    }
    if(course.courseContent.some((section)=>section.subSection.length===0)){
        toast.error("Please add atleast one lecture in each section");
        return;
    }
    //if everything is good
    dispatch(setStep(3));
}

                           // FORM LOGIC
const sectionManageHandler=async(data)=> {
    // console.log("DATA SECTION CREATE KARNE KA : ",data);
    setLoading(true);
    let result;
    //work on section editing
    if(editSectionName) {
        result = await updateSection(
            {
                sectionName : data.sectionName,
                sectionId : editSectionName,
                courseId : course._id,
            } , token
        )
    }
    //if we create the seciton not editing 
    else{
        result = await createSection(
            {
                sectionName : data.sectionName,
                courseId : course._id,
            },token
        )
        // console.log("RESULT OF CREATING SECTION: ",result);
    }
    //update the values
    if(result){
        dispatch(setCourse(result));
        setEditSectionName(null);
        setValue("sectionName","");
    }
    setLoading(false);
}

const handleChangeEditSectionName = (sectionId , sectionName ) => {

    if(editSectionName===sectionId) {
        cancelEdit();
        return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName",sectionName);
}

    
    return (
        <div className='space-y-8 rounded-2xl border-[1px] border-navyblue-700 bg-navyblue-900 p-6'>
            <p className='text-2xl font-semibold text-orange-200'>Course Builder</p>
            <form onSubmit={handleSubmit(sectionManageHandler)} className='space-y-4'>
                <div className='flex flex-col space-y-2'>
                    <label htmlFor='sectionName' className='text-sm text-orange-100'>Section Name <sup className='text-pink-200'>*</sup></label>
                    <input
                        id="sectionName"
                        className='input-style w-full'
                        placeholder='Add Section name'
                        {...register("sectionName", { required: true })}
                    />
                    {errors.sectionName && (
                        <span className='ml-2 text-xs tracking-wide text-pink-200'>Section name is required</span>
                    )}
                </div>

                {/* Button Field */}
                <div className='flex  gap-x-4'>
                    <ModalButton
                        type="Submit"
                        text={editSectionName ? "Edit Section" : "Create Section"}
                    >
                        <IoMdAddCircleOutline  />
                    </ModalButton>

                    {editSectionName && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className='text-sm text-navyblue-200 underline'>
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            {/* Conditional rendering based on course and courseContent existence */}
            {course && course.courseContent && course.courseContent.length > 0 && (
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
            )}

            <div className='flex justify-end gap-x-2'>
                <button onClick={goBack}
                    className='cursor-pointer rounded-lg font-semibold py-2 px-5 bg-pink-200 text-richblack-900 hover:bg-richblack-900 hover:text-pink-200'>
                    Back
                </button>
                <ModalButton text="Next" onClick={goNext}>
                    <MdSkipNext />
                </ModalButton>
            </div>
        </div>
    );
}
export default CourseBuilderForm;