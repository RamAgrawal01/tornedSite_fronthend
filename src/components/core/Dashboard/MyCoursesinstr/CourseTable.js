import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Table,Th,Tr,Td, Tbody, Thead} from 'react-super-responsive-table';
import { COURSE_STATUS } from '../../../../utils/constants';
import { CiEdit } from "react-icons/ci";
import { MdDeleteSweep } from "react-icons/md";
import { useState } from 'react';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setPaymentLoading } from '../../../../slices/courseSlice';
import ConfirmationModal from '../../../common/confirmationModal';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { FaRegClock } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const CoursesTable = ({courses , setCourses}) => {
    // console.log("COURSES: ",courses);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {token} = useSelector((state)=>state.auth)
    const [loading , setLoading] = useState(false);
    const [confirmationModal , setConfirmationModal] = useState(null);

    const courseDeleteHandler = async(courseId) => {
        setLoading(true);
        await deleteCourse({courseId:courseId},token);
        const result = await fetchInstructorCourses(token);
        if(result){
            setCourses(result);
        }
        setConfirmationModal(null);
        setLoading(false);
        
    }
    
    return(
    <div>
        <Table className="border-navyblue-700 border-2 mt-8 rounded-2xl ">
            <Thead>
                <Tr className="flex gap-x-10 border-b-2 border-navyblue-700 px-6 py-2">
                    <Th className="flex-1 text-left text-sm font-medium uppercase text-navyblue-100">
                        Courses
                    </Th>
                    <Th className=" text-left text-sm font-medium uppercase text-navyblue-100 ">
                        Duration
                    </Th>
                    <Th className=" text-left text-sm font-medium uppercase text-navyblue-100">
                        Price
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-navyblue-100">
                        Action
                    </Th>
                </Tr>
            </Thead>

            <Tbody>
                {
                   !loading && courses.length ===0 ? (
                        <Tr className="flex text-2xl border-navyblue-700 py-10 text-center text-navyblue-100">
                            <Td>
                                No courses found
                            </Td>
                        </Tr>
                    ) :
                    (
                       courses?.map((course)=>(
                        <Tr key={course._id} className="flex gap-x-10 border-b border-navyblue-700 px-6 py-8">
                            <Td className="flex flex-1 gap-x-4 relative">
                               <img src={course?.thumbnail}
                               className='h-[150px] w-[270px] rounded-lg object-cover'
                               alt="courseThumbnail" /> 

                               <div className='flex flex-col'>
                                <p className='text-lg font-semibold text-navyblue-50 capitalize'>{course.courseName}</p>
                                <p className='text-xs text-navyblue-200 mt-1'>{course.courseDescription}</p>
                                <p className='text-12px text-navyblue-100 mt-1'>Created: {course?.createdAt}</p>
                                <p className='text-12px text-navyblue-100 mt-1'>Updated:{course?.updatedAt}</p>
                                {
                                    course.status === COURSE_STATUS.DRAFT ? (
                                        <p className='text-orange-400 mt-2 flex w-fit items-center gap-2 rounded-full bg-navyblue-700 px-4 py-[4px]
                                        text-[14px] font-medium'>
                                            <FaRegClock/>
                                            DRAFTED</p>
                                    ):
                                    (
                                        <p className='text-yellow-50 mt-2 flex w-fit items-center gap-2 rounded-full bg-navyblue-700 px-4 py-[5px]
                                        text-[14px] font-medium'>
                                            <FaCheck/>
                                            PUBLISHED</p>
                                    )
                                }

                               </div>
                            </Td>

                            <Td className="text-sm font-medium text-navyblue-100 ">
                                2hr 30min
                            </Td>

                            <Td className="text-sm font-medium text-navyblue-100 ">
                            ₹{" "}{course.price}
                            </Td>

                            <Td className="text-sm font-medium text-navyblue-100 space-x-3  ">
                                <button
                                disabled={loading}
                                className='hover:scale-120 hover:text-yellow-100'
                                onClick={()=>{
                                    navigate(`/dashboard/edit-course/${course._id}`)
                                }}>
                               
                                    <CiEdit/>
                                </button>

                                <button
                                disabled={loading}
                                onClick={() => setConfirmationModal({
                                text1: "Do You Want to Delete this course ?",
                                 text2: "All the data related to this course will be deleted",
                                buttonText: "Delete",
                                button2Text: "Cancel",
                                buttonHandler: !loading ? () => courseDeleteHandler(course._id) : () => {},
                                button2Handler: !loading ? () => setConfirmationModal(null) : () => {}
                            })}
                                >
                                    <MdDeleteSweep />
                                </button>
                            </Td>

                        </Tr>
                    )) 
                    )
                }
            </Tbody>

        </Table>
       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
    )
}
export default CoursesTable;