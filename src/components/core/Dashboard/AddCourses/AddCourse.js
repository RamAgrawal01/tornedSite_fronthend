import React from 'react'
import RenderSteps from './RenderSteps';
const AddCourse = () => {
    return(
       <>
       <div className='flex w-full items-start gap-x-6'>
        <div className='flex flex-1 flex-col'>
          <h1 className="mb-14 text-3xl font-medium text-orange-200  text-center lg:text-left">Add Course</h1>
          <div className='flex-1'>
            <RenderSteps/>

          </div>
          </div>

          <div className='sticky top-10 hidden lg:block max-w-[400px] flex-1 rounded-lg border-[1px] border-navyblue-700 bg-navyblue-800 p-6'>
            <p className='mb-8 text-lg text-orange-200'> ⚡ Code Upload Tips</p>
            <ul className='ml-5 list-item list-disc space-y-4 text-xs text-navyblue-50'>
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>Add Topics in the Course Builder section to create lessons,quizzes, and assignments.</li>
          <li>Information from the Additional Data section shows up on thecourse single page.</li>
          <li>Make Announcements to notify any important</li>
          <li>Notes to all enrolled students at once.</li>
        </ul>
          </div>
         </div>
     
       </>
 )
}
export default AddCourse;