import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import ModalButton from '../../../common/ModalButton';
import CoursesTable from './CourseTable';
import { useState } from 'react';
const MyCourses = () => {

    const {token} = useSelector((state)=>state.auth);
    const [courses , setCourses ] = useState([]);
    const [loading ,setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchCoursesOfInstructor = async () => {
            setLoading(true);
            const result = await fetchInstructorCourses(token);
            console.log("RESULT OF INSTRUCTOR COURSES: ",result)
            setLoading(false);
            if(result){
                setCourses(result);
            }
        }
        fetchCoursesOfInstructor();
    },[])

    return(
     <div>
        <div className='flex justify-between'>
            <h1 className='text-4xl font-medium text-navyblue-50 text-center lg:text-left'>My Courses</h1>
            <ModalButton
            text="Add Course"
            onClick={()=>navigate('/dashboard/add-course')}
            // TODO ICON OF ADD
            />
        </div>

        {courses && <CoursesTable courses={courses} setCourses={setCourses}/>}
     </div>
    )
}
export default MyCourses;