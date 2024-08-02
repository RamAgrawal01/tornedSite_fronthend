import React from 'react' ;
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { useState } from 'react';
import { MdModeEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../common/confirmationModal';
import { setCourse } from '../../../../../slices/courseSlice';
import { deleteSection } from '../../../../../services/operations/courseDetailsAPI';
import { deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
const NestedView = ({handleChangeEditSectionName}) => {

    const {course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    const [addSubSection , setAddSubSection] = useState(null);
    const [viewSubSection ,setViewSubSection] = useState(null);
    const [editSubSection , setEditSubSection] = useState(null);

    const [confirmationModal , setConfirmationModal] = useState(null);

// *********DELETE SECTION************//
    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({sectionId , courseId :course._id},token)

        if(result){
            dispatch(setCourse(result))
        }
        setConfirmationModal(null);
    }
// **********DELETE SUBSECTION *********//
    const handleDeleteSubSection = async(subSectionId , sectionId)=> {
        const result = await deleteSubSection({subSectionId,sectionId},token)
    
    if(result){
      //yha par me bura wala fasa tha 
      const updatedCourseContent = course.courseContent.map((section)=>
        section._id===sectionId ? result : section);

      const updatedCourse = {...course ,courseContent:updatedCourseContent}
        dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
    }

    

    return (
        <>
          <div className='rounded-2xl bg-navyblue-800 p-6 px-8' id="nestedViewContainer">
            {course?.courseContent?.map((section) => (
              //section dropdown
              <details key={section._id} open >
                <summary className='flex cursor-pointer items-center justify-between border-b-2 border-b-navyblue-600 py-2 '>
                  <div className='flex items-center gap-x-3'>
                    <RxDropdownMenu className='text-white text-2xl' />
                    <p className='text-navyblue-50 font-semibold'>{section.sectionName}</p>
                  </div>
                  <div className='flex items-center gap-x-3'>
                    <button
                      onClick={() =>
                        handleChangeEditSectionName(section._id, section.sectionName)
                      }>
                      <MdModeEdit className='text-xl text-navyblue-300' />
                    </button>
    
                    <button
                      onClick={() => {
                        setConfirmationModal({
                          text1: 'Delete This Section',
                          text2: 'All the lectures in this section will be deleted',
                          buttonText: 'Delete',
                          button2Text: 'Cancel',
                          buttonHandler: () => handleDeleteSection(section._id),
                          button2Handler: () => setConfirmationModal(null),
                        });
                      }}>
                      <MdOutlineDeleteOutline className='text-xl text-navyblue-300' />
                    </button>
                    <span className='font-medium text-navyblue-300'>|</span>
                    <IoMdArrowDropdown className='text-xl text-navyblue-300' />
                  </div>
                </summary>
    
                {/* SUBSECTION */}
                <div className='px-6 pb-4'>
                  {section.subSection.map((subSection) => (
                    <div
                      key={subSection._id}
                      onClick={() => setViewSubSection(subSection)}
                      className='flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-navyblue-600 py-2'>
                      <div className='flex items-center gap-x-3 py-2'>
                        <RxDropdownMenu className='text-navyblue-100 text-2xl' />
                        <p className='text-navyblue-100 font-semibold'>{subSection.title}</p>
                      </div>
    
                      <div
                     onClick={(e) => e.stopPropagation()}
                      className='flex items-center gap-x-3'>
                        <button
                          onClick={() =>
                            setEditSubSection({ ...subSection, sectionId: section._id })
                          }>
                          <MdModeEdit className='text-xl text-navyblue-300' />
                        </button>
    
                        <button
                          onClick={() => {
                            setConfirmationModal({
                              text1: 'Delete This Lecture',
                              text2: 'Selected Lecture will be deleted',
                              buttonText: 'Delete',
                              button2Text: 'Cancel',
                              buttonHandler: () => handleDeleteSubSection(subSection._id, section._id),
                              button2Handler: () => setConfirmationModal(null),
                            });
                          }}>
                          <MdOutlineDeleteOutline className='text-xl text-navyblue-300' />
                        </button>
                      </div>
                    </div>
                  ))}
    
                  {/* Add lecture */}
                  <button
                    onClick={() => setAddSubSection(section._id)}
                    className='mt-3 flex items-center gap-x-2 text-yellow-50'>
                    <FaPlus className='text-[1rem]' />
                    <p>Add Lecture</p>
                  </button>
                </div>
              </details>
            ))}
          </div>
    
          {/* Modal Display */}
          {addSubSection ? (
            <SubSectionModal
              modalData={addSubSection}
              setModalData={setAddSubSection}
              add={true}
            />
          ) : viewSubSection ? (
            <SubSectionModal
              modalData={viewSubSection}
              setModalData={setViewSubSection}
              view={true}
            />
          ) : editSubSection ? (
            <SubSectionModal
              modalData={editSubSection}
              setModalData={setEditSubSection}
              edit={true}
            />
          ) : (
            <></>
          )}
    
          {/* Confirmation Modal */}
          {confirmationModal ? (
            <ConfirmationModal modalData={confirmationModal} />
          ) : (
            <></>
          )}
        </>
      );
    };
    
    export default NestedView;