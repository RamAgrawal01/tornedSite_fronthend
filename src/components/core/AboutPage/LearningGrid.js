import React from "react";
import HighlightText from "../HomePage/HighlightText";
import CTAButton from "../HomePage/CTAButton";
import { setScreenSize } from "../../../slices/sidebarSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const LearningGrid =() => {

  const { screenSize } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch()

  useEffect(() => {
    const handleResize = () => dispatch(setScreenSize(window.innerWidth));
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize the screen size on component mount
    return () => window.removeEventListener('resize', handleResize);
}, [dispatch]);

  

    const LearningGridArray = [
        {
          order: -1,
          heading: "World-Class Learning for",
          highlightText: " Anyone, Anywhere",
          description:
            "Torned Education partners with more than 275+ leading Schools and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
          BtnText: "Learn More",
          BtnLink: "/",
        },
        {
          order: 1,
          heading: "Curriculum Based on Industry Needs",
          description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
          order: 2,
          heading: "Our Learning Methods",
          description:
            "Torned Education partners with more than 275+ leading Schools and companies to bring",
        },
        {
          order: 3,
          heading: "Certification",
          description:
            "Torned Education partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 4,
          heading: `Rating "Auto-grading"`,
          description:
            "Torned Education  partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 5,
          heading: "Ready to Work",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
      ];

    return(
        <div className="grid mx-auto w-[350px] lg:w-fit grid-cols-1 lg:grid-cols-4 mb-12">
            {
                LearningGridArray.map((element,index)=>{
                    return(
                        <div key={index}
                        className={`${index===0 && "lg:col-span-2 bg-transparent lg:h-[294px]"}
                        ${element.order%2===0 ? "bg-navyblue-800 h-[294px]" : "bg-navyblue-700 h-[294px]"}
                        ${element.order===3 && "lg:col-start-2"}`}>

                        {
                            element.order=== -1 ?
                            (<div className={`lg:w-[87%]  lg:pb-0 flex flex-col gap-3 `}>
                                <div className="lg:text-4xl text-3xl font-semibold">
                                    {element.heading}
                                    <HighlightText text={element.highlightText}/>
                                </div>
                                <p className="text-orange-200 font-medium">{element.description}</p>

                                <div className="w-fit lg:mt-3 ">
                                <CTAButton active={true} linkto={element.BtnLink}>
                                    {element.BtnText}
                                </CTAButton>
                                </div>
                               
                            </div>
                            )
                             :(
                                <div className="p-8 flex flex-col gap-8  ">
                                <h1 className="text-orange-300 text-lg font-semibold">
                                    {element.heading}
                                </h1>
                                <p className="text-orange-100 font-medium">{element.description}</p>
                                </div>
                             )
                        }

                        </div>
                    )
                })
            }

        </div>
    )
}
export default LearningGrid;