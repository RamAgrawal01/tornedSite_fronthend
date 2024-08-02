import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../../../slices/profileSlice';
import { addCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { FaIndianRupeeSign } from "react-icons/fa6";
import ChipInput from './ChipInput';
import Upload from '../Upload';
import RequiremetField from './RequirementField';
import ModalButton from '../../../../common/ModalButton';
import { setStep } from '../../../../../slices/courseSlice';
import { setCourse } from '../../../../../slices/courseSlice';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { COURSE_STATUS } from '../../../../../utils/constants';
import toast from 'react-hot-toast';

const CourseInformationForm = () => {
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    const { course, editCourse } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);
    const dispatch = useDispatch();
  
    useEffect(() => {
      const getCategories = async () => {
        setLoading(true);
        const categories = await fetchCourseCategories();
        if (categories.length > 0) {
          setCourseCategories(categories);
        }
        setLoading(false);
      };
  
      // Prefill form if editing
      if (editCourse) {
        setValue("courseTitle", course.courseName);
        setValue("courseShortDesc", course.courseDescription);
        setValue("coursePrice", course.price);
        setValue("courseTags", course.tag);
        setValue("courseBenefits", course.whatYouWillLearn);
        setValue("courseCategory", course.category);
        setValue("courseRequirements", course.instructions);
        setValue("courseImage", course.thumbnail);
      }
      getCategories();
    }, [editCourse, course, setValue]);
  
    // Check if form is updated
    const isFormUpdated = () => {
      const currentValues = getValues();
      return (
        currentValues.courseTitle !== course.courseName ||
        currentValues.courseShortDesc !== course.courseDescription ||
        currentValues.coursePrice !== course.price ||
        currentValues.courseTags.toString() !== course.tag.toString() ||
        currentValues.courseBenefits !== course.whatYouWillLearn ||
        currentValues.courseCategory._id !== course.category._id ||
        currentValues.courseRequirements.toString() !== course.instructions.toString() ||
        currentValues.courseImage !== course.thumbnail
      );
    };
  
    // Form submission logic
    const step1Handler = async (data) => {
      console.log("FORM DATA BEFORE APPENDING TO FORMDATA:", data);
  
      if (editCourse) {
        if (isFormUpdated()) {
          const formData = new FormData();
          formData.append("courseId", course._id);
  
          if (data.courseTitle !== course.courseName) formData.append("courseName", data.courseTitle);
          if (data.courseShortDesc !== course.courseDescription) formData.append("courseDescription", data.courseShortDesc);
          if (data.coursePrice !== course.price) formData.append("price", data.coursePrice);
          if (data.courseTags.toString() !== course.tag.toString()) formData.append("tag", JSON.stringify(data.courseTags));
          if (data.courseBenefits !== course.whatYouWillLearn) formData.append("whatYouWillLearn", data.courseBenefits);
          if (data.courseCategory._id !== course.category._id) formData.append("category", data.courseCategory);
          if (data.courseRequirements.toString() !== course.instructions.toString()) formData.append("instructions", JSON.stringify(data.courseRequirements));
          if (data.courseImage !== course.thumbnail) formData.append("thumbnailImage", data.courseImage);
  
          setLoading(true);
          const result = await editCourseDetails(formData, token);
          setLoading(false);
  
          if (result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
          }
        } else {
          toast.error("No changes made to form");
        }
      } else {
        // Creating new course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("tag", JSON.stringify(data.courseTags));
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("status", COURSE_STATUS.DRAFT);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("thumbnailImage", data.courseImage);
  
        console.log("FORM DATA APPENDED TO FORMDATA:", Array.from(formData.entries()));
  
        setLoading(true);
        const result = await addCourseDetails(formData, token);
        setLoading(false);
  
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      }
    };

    return (
        <form onSubmit={handleSubmit(step1Handler)}
            className='rounded-lg border-navyblue-700 border-[1px] bg-navyblue-900 p-6 space-y-8 relative'>

            {/* Course Title */}
            <div className='flex flex-col space-y-2'>
                <label htmlFor='courseTitle' className='text-sm text-orange-100'>Course Title
                  <sup className='text-pink-200'>*</sup>
                  </label>
                <input
                    id="courseTitle"
                    placeholder='Enter Course Title'
                    className='input-style w-full'
                    {...register("courseTitle", { required: true })} />
                {errors.courseTitle && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">Course Title is required</span>
                )}
            </div>

            {/* Course Description */}
            <div className='flex flex-col space-y-2'>
                <label htmlFor='courseShortDesc' className='text-sm text-orange-100'>Course Short Description<sup className='text-pink-200'>*</sup></label>
                <textarea
                    id="courseShortDesc"
                    placeholder='Enter Description for your course'
                    className='resize-x-none min-h-[130px] w-full input-style'
                    {...register("courseShortDesc", { required: true })}
                />
                {
                    errors.courseShortDesc && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Course Description is Required</span>
                    )
                }
            </div>

            {/* Course price */}
            <div className='flex flex-col space-y-2'>
                <label htmlFor='coursePrice' className='text-sm text-orange-100'>Course Price<sup className='text-pink-200'>*</sup></label>
                <input
                    id="coursePrice"
                    placeholder='Enter Course Price'
                    className='input-style pl-12 w-full'
                    {...register("coursePrice", { required: true, valueAsNumber: true,
                      pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                      },
                     })} />
                
                <FaIndianRupeeSign className="absolute translate-x-2 translate-y-[2rem] text-2xl text-navyblue-400" />


                {
                    errors.coursePrice && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Course Price is required</span>
                    )
                }
            </div>

            {/* Course Category */}
            <div className='flex flex-col space-y-2'>
                <label htmlFor='courseCategory' className='text-sm text-orange-100'>Course Category <sup className='text-pink-200'>*</sup></label>
                <select
                    id="courseCategory"
                    className='input-style cursor-pointer'
                    defaultValue=""
                    {...register("courseCategory", { required: true })}>
                    <option value="" disabled>Choose Category</option>
                    {
                        !loading && courseCategories.map((category, index) => (
                            <option key={index} value={category?._id}>
                                {category?.name}
                            </option>
                        ))
                    }
                </select>
                {
                    errors.courseCategory&&(
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Course Category is required</span>
                    )
                }
            </div>

           {/* Course Tags */}
         <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter or Comma"
        register={register}
        errors={errors}
        setValue={setValue}
         />

          {/* Course Thumbnail Image */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

        {/* Benefits of the course */}
        <div className='flex flex-col space-y-2'>
        <label htmlFor="courseBenefits" className='text-sm text-orange-100'>
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="input-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>

      {/* Requirements/Instructions */}
      <RequiremetField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
      />

      <div className='flex justify-end gap-x-2'>
        {
            editCourse && (
                <button
                onClick ={()=>dispatch(setStep(2))}
                className='cursor-pointer flex gap-x-2 items-center rounded-lg font-semibold py-2 px-5 bg-pink-200 text-richblack-900 hover:bg-richblack-900 hover:text-pink-200 '>
                    Continue Without Saving
                </button>
            )
        }

        <ModalButton
        text={!editCourse ? "Next" : "Save Changes"}
        type="submit"/>
      </div>

        </form>
    )
}

export default CourseInformationForm;
