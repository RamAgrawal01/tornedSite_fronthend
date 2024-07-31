import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GiReturnArrow } from 'react-icons/gi';
import { IoMdArrowDropdown } from 'react-icons/io';
import ModalButton from '../../common/ModalButton';
import { IoMdClose } from 'react-icons/io'
import { HiMenuAlt1 } from 'react-icons/hi'
import { setCourseViewSidebar } from '../../../slices/sidebarSlice';
import { setScreenSize } from '../../../slices/sidebarSlice';
import { setOpenSideMenu } from '../../../slices/sidebarSlice';
import { BiScreenshot } from 'react-icons/bi';


const VideoDetailsSideBar = ({ setReviewModal }) => {
    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { sectionId, subSectionId } = useParams();

    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewCourse);

    const{openSideMenu , screenSize} = useSelector((state)=>state.sidebar);


    // ye wala hook screen ke size ko note kar rha ha
    useEffect(()=>{
        const handleResize = () => dispatch(setScreenSize(window.innerWidth))
        window.addEventListener('resize',handleResize)
        handleResize()
        return() => window.removeEventListener('resize',handleResize);
    })

    //agar screen size chota hoga to bar ki close karke sirf small routes visiblehonge
    useEffect(()=>{
        if(screenSize<= 640){
            dispatch(setOpenSideMenu(false))
        }
        else(dispatch(setOpenSideMenu(true)))
    },[screenSize])


    useEffect(() => {
        const fetchingCompleteCourseData = () => {
            if (!courseSectionData.length) {
                return;
            }

            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            );

            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            );

            const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[
                currentSubSectionIndex
            ]?._id;

            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            setVideoBarActive(activeSubSectionId);
        };
        fetchingCompleteCourseData();
    }, [courseSectionData, courseEntireData, location.pathname]);


    const handleSubsectionClick = (subSectionId, sectionId) => {
        navigate(`/view-course/${courseEntireData?._id}/section/${sectionId}/sub-section/${subSectionId}`);
        setVideoBarActive(subSectionId);
        if (screenSize<640) {
            dispatch(setOpenSideMenu(false));
        }
    };

    return (
        <>
            <div className='relative'>
            <div className="sm:hidden absolute left-7 top-6 cursor-pointer z-[1000] flex h-[40px] w-[40px] items-center justify-center rounded-full bg-navyblue-300 p-2 text-navyblue-900 
                                hover:scale-95 transition-all duration-200  " onClick={() => dispatch(setOpenSideMenu(!openSideMenu))}>
        {
          openSideMenu ? <IoMdClose size={33} /> : <HiMenuAlt1 size={33} />
        }
      </div>

            {
                openSideMenu && (
                    <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-navyblue-700 bg-navyblue-800">
                {/* For buttons and heading */}
                <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-navyblue-600 py-5 text-lg font-bold text-navyblue-50">
                    <div className={`flex  w-full items-center justify-between `}>

                        {/* Buttons */}
                        <button
                            onClick={() => navigate("/dashboard/enrolled-courses")}
                            className={`flex h-[40px] w-[40px] items-center justify-center rounded-full bg-navyblue-300 p-2 text-navyblue-900 
                                hover:scale-95 transition-all duration-200 ${screenSize<640 ? "hidden" : ""}`}
                        >
                            <GiReturnArrow size={30} />
                        </button>

                        <ModalButton
                            text="Add Review"
                            customClasses={`${screenSize<640 ? "ml-32" : ""}`}
                            onClick={() => {
                                console.log("Opening review modal");
                                setReviewModal(true);
                            
                            }}
                        />
                    </div>

                    {/* Heading */}
                    <div className="flex flex-col mt-3">
                        <p>{courseEntireData?.courseName}</p>
                        <p className="text-sm font-semibold text-navyblue-300">
                            {completedLectures?.length} / {totalNoOfLectures}
                        </p>
                    </div>
                </div>

                {/* For section and Subsection */}
                <div className="h-[calc(100vh-5rem)] overflow-y-auto  transition-[0.3s]">
                    {courseSectionData.map((section, index) => (
                        <div
                            className="mt-3 cursor-pointer text-sm text-navyblue-50 "
                            onClick={() => setActiveStatus(section?._id)}
                            key={index}
                        >
                            {/* section */}
                            <div className="flex justify-between bg-navyblue-700 px-5 py-4">
                                <p className="w-[70%] font-semibold">
                                    {section?.sectionName}
                                </p>

                                <div className="flex items-center gap-3">
                                    <span className="text-[12px] font-medium">
                                        {`Lesson ${section?.subSection?.length}`}
                                    </span>

                                    <span
                                        className={`${
                                            activeStatus === section?._id
                                                ? "rotate-0 transition-all duration-300"
                                                : "rotate-180"
                                        }`}
                                    >
                                        <IoMdArrowDropdown />
                                    </span>
                                </div>
                            </div>

                            {/* subsection */}
                            {activeStatus === section?._id && (
                                <div  className={`overflow-hidden transition-all duration-200 ease-in-out ${
                                    activeStatus === section?._id ? 'max-h-[1000px]' : 'max-h-0'
                                }`}>
                                    {section.subSection.map((subSection, subIndex) => (
                                         <div
                                         className={`flex gap-3 px-5 py-2 ${
                                             videoBarActive === subSection._id
                                                 ? 'bg-orange-400 text-navyblue-950'
                                                 : 'bg-navyblue-900 text-navyblue-50'
                                         }`}
                                         key={subIndex}
                                         onClick={() => handleSubsectionClick(subSection._id, section._id)}
                                     >
                                            <input
                                                type="checkbox"
                                                checked={completedLectures.includes(subSection?._id)}
                                            />
                                            <span>{subSection.title}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
                )
            }

            </div>

        </>
    );
};
export default VideoDetailsSideBar;
