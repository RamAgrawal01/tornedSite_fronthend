import React from 'react';
import { useSelector } from 'react-redux';
import { FaCheck } from "react-icons/fa";
import CourseInformationForm  from './courseInformation.js/CourseInformation';
import CourseBuilderForm from './courseBuilder/CourseBuilder';
import PublishCourse from './PublishCourse/PublishCourse';

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
  const {editCourse} = useSelector((state)=>state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information"
    },
    {
      id: 2,
      title: "Course Builder"
    },
    {
      id: 3,
      title: "Publish"
    }
  ];

  return (
    <>
      <div className='relative mb-2 flex w-full select-none justify-center'>
        {steps.map((item) => (
          <React.Fragment key={item.id}>
            <div className='flex flex-col items-center'>

            <div
                className={`grid  aspect-square w-[34px] place-items-center rounded-full border-[2px] 
                    ${step === item.id ? "border-caribbeangreen-100 bg-pink-300 text-white"
                    : "border-navyblue-700 bg-navyblue-800 text-navyblue-300"}
                    ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
              >
                {step > item.id ?
                  (<FaCheck className="font-bold text-richblack-900" />)
                  : (item.id)
                }
              </div>

            </div>
            {/* if not in last step */}
            {item.id !== steps.length && (
              <div className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2 ${step > item.id ? "border-pink-200" : "border-navyblue-500"}`}>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className='relative mb-16 flex w-full select-none justify-between'>
        {steps.map((item) => (
          <React.Fragment key={item.id}>
            <div className={`sm:min-w-[120px] flex flex-col items-center gap-y-2 ${editCourse && 'sm:min-w-[270px]'}`} key={item.id}>
            <p className={`text-sm ${step >= item.id ? "text-navyblue-50" : "text-navyblue-400"}`}>
              {item.title}
            </p>
          </div>
          </React.Fragment>
        ))}
      </div>
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
};

export default RenderSteps;
