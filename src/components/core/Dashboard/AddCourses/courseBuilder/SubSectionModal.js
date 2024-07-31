import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RxCross1 } from "react-icons/rx";
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import ModalButton from '../../../../common/ModalButton';
import Upload from "../Upload";
import {setCourse} from "../../../../../slices/courseSlice"
import { GiCrossMark } from "react-icons/gi";

const SubSectionModal = ({ modalData, setModalData, add = false, view = false, edit = false }) => {

  const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  useEffect(() => {
    if (view || edit) {
      console.log("Modal Data:", modalData)
      setValue("lectureTitle", modalData.title)
      setValue("lectureDesc", modalData.description)
      setValue("lectureVideo", modalData.videoUrl)
    }
  }, [view, edit, modalData, setValue])
  
  // detect whether form is updated or not
  const isFormUpdated = () => {
    const currentValues = getValues()
    console.log("Current Values:", currentValues)
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true
    }
    return false
  }
  console.log("isFormUpdated: ", isFormUpdated())
  
  // handle the editing of subsection
  const handleEditSubsection = async () => {
    const currentValues = getValues()
    if (!isFormUpdated()) {
      toast.error("No changes made to the form")
      return
    }
    console.log("Changes after editing form values:", currentValues)
    const formData = new FormData()
    console.log("Values After Editing form values:", currentValues)
    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)
    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle)
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc)
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo)
    }
    console.log("FormData to be sent:", formData)
    setLoading(true)
    const result = await updateSubSection(formData, token)
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }
  
  const addSubSectionHandler = async (data) => {
    console.log(data)
    if (view) return
  
    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
      } else {
        handleEditSubsection()
      }
      return
    }
  
    const formData = new FormData()
    formData.append("sectionId", modalData)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("video", data.lectureVideo)
    setLoading(true)
    const result = await createSubSection(formData, token)
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }


    return(
        <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm '>
        <div className='my-3 w-11/12 max-w-[700px] rounded-lg border border-navyblue-400 bg-navyblue-900'>
            <div className='flex items-center justify-between rounded-t-lg bg-navyblue-800 p-5'>
                <p className='text-xl font-semibold text-orange-200'>{view && "viewing Lecture "} {add && "Adding "}{edit && "Editing "}Lecture</p>

                <button onClick={()=>(!loading ? (setModalData(null)) : (<div></div>) )}>
                <GiCrossMark className='text-2xl text-orange-200'/>
                </button>
            </div>

            <form onSubmit={handleSubmit(addSubSectionHandler)}
            className='space-y-6 px-8 py-5'>
                <Upload
                type="file"
                name="lectureVideo"
                label="Lecture Video"
                register = {register}
                setValue = {setValue}
                errors = {errors}
                video = {true}
                viewData = {view ? modalData.videoUrl:null}
                editData = {edit ? modalData.videoUrl:null}
                />

                <div className='flex flex-col space-y-2'>
                    <label htmlFor='lectureTitle' className='text-sm text-orange-100'>Lecture Title<sup>*</sup></label>
                    <input
                    id="lectureTitle"
                    placeholder='Enter Lecture Title'
                    {...register("lectureTitle",{required:true})}
                    className='input-style w-full'
                    />
                    {errors.lectueTitle && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Lecture title is required</span>
                    )}
                </div>

                <div className='flex flex-col space-y-2'>
                    <label className="text-sm text-orange-100" htmlFor='lectureDesc'>Lecture Description<sup>*</sup></label>
                    <textarea
                    id="lectureDesc"
                    placeholder='Enter Lecture Description'
                    {...register("lectureDesc",{required:true})}
                    className="input-style resize-x-none min-h-[100px] w-full"
                    />
                    {errors.lectueDesc && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Lecture Description is required</span>
                    )}
                </div>

                {
                    !view && (
                        <div className='flex justify-end'>
                            <ModalButton
                            
                            text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                            />
                        </div>
                    )
                }
            </form>

        </div>
        </div>
    )
}
export default SubSectionModal;