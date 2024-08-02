import React, { useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import { GiProgression } from "react-icons/gi";

const StudentsEnrolled = ({ course , screenSize }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter students based on search term
  const filteredStudents = course.EnrollStudents.filter(student =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-[2rem] px-4">

   <div className='lg:flex justify-between '>
   <h2 className="text-2xl text-orange-200">Profile of Students Enrolled</h2>
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[300px] p-2 bg-navyblue-800 border border-navyblue-600 rounded text-navyblue-100"
        />
      </div>
   </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 lg:mt-[4rem] mt-[5rem]">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <div key={index} className="relative flex flex-col items-center justify-center p-8 bg-navyblue-700 rounded-lg shadow-2xl">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full overflow-hidden border-8 border-orange-500 shadow-lg">
                <img src={student.image} alt="profile image" className="w-full h-full object-cover aspect-square" />
              </div>
              <p className="mt-20 mb-3 text-lg font-bold text-orange-300">{student.firstName} {student.lastName}</p>
              <p className="flex items-center mb-3 text-navyblue-100">
                <i className="fas fa-envelope mr-2"></i>
                {student.email}
              </p>
              <div className="flex flex-col w-full mb-7 text-center text-navyblue-50 gap-3">
                <p><span className="block font-bold">{student.progressPercentage}%</span> Progress</p>
                <div className="w-[70%] h-[10px] mx-auto  rounded">
                 <ProgressBar
                 completed={student.progressPercentage}
                 isLabelVisible={false}
                 />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentsEnrolled;
