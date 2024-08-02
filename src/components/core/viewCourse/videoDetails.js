import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { Player, BigPlayButton, ControlBar, ReplayControl, ForwardControl, PlaybackRateMenuButton } from 'video-react';
import "video-react/dist/video-react.css";
import ModalButton from '../../common/ModalButton';
import { setOpenSideMenu, setScreenSize } from '../../../slices/sidebarSlice';

const VideoDetails = () => {

    const { courseId, sectionId, subSectionId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const playerRef = useRef();
    const { token } = useSelector((state) => state.auth);
    const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse);

    const [videoData, setVideoData] = useState([]);
    const [isVideoEnd, setIsVideoEnd] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const setVideoSpecificDetails = async () => {
            if (!courseSectionData.length) {
                return;
            }
            if (!courseId && !sectionId && !subSectionId) {
                navigate("/dashboard/enrolled-courses");
            } else {
                const filteredData = courseSectionData.filter(
                    (section) => section._id === sectionId
                );
                const filterVideoData = filteredData?.[0]?.subSection.filter(
                    (data) => data._id === subSectionId
                );
                if (filterVideoData) setVideoData(filterVideoData[0]);
                setIsVideoEnd(false);
            }
        };
        setVideoSpecificDetails();
    }, [courseSectionData, courseEntireData, location.pathname, courseId, sectionId, subSectionId, navigate]);

    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        );
        return currentSectionIndex === 0 && currentSubSectionIndex === 0;
    };

    const isLastVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );
        const numberOfSubSection = courseSectionData[currentSectionIndex].subSection.length;
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        );
        return currentSectionIndex === courseSectionData.length - 1 &&
            currentSubSectionIndex === numberOfSubSection - 1;
    };

    const goToNextVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );
        const numberOfSubSection = courseSectionData[currentSectionIndex].subSection.length;
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        );
        if (currentSubSectionIndex !== numberOfSubSection - 1) {
            const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
        } else {
            const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
            const firstSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${firstSubSectionId}`);
        }
    };

    const goToPrevVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        );
        if (currentSubSectionIndex !== 0) {
            const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
        } else {
            const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
            const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
            const lastSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${lastSubSectionId}`);
        }
    };

    const handleLectureComplete = async () => {
        setLoading(false);
        const res = await markLectureAsComplete({
            courseId: courseId,
            subSectionId: subSectionId
        }, token);
        if (res) {
            dispatch(updateCompletedLectures(subSectionId));
        }
    };

    const { openSideMenu, screenSize } = useSelector((state) => state.sidebar);

    useEffect(() => {
        const handleResize = () => dispatch(setScreenSize(window.innerWidth));
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch]);

    if (openSideMenu && screenSize <= 640) return null;

    return (
        <div className="flex flex-col gap-5 text-white">
            {
                !videoData ? (<div>No Lecture found</div>) : (
                    <div className="relative w-full">
                        <Player
                            ref={playerRef}
                            aspectRatio='16:9'
                            playsInline
                            onEnded={() => setIsVideoEnd(true)}
                            src={videoData?.videoUrl}
                            className="w-full"
                        >
                            <BigPlayButton position='center' />
                            <ControlBar>
                                <ReplayControl seconds={10} order={1.1} />
                                <ForwardControl seconds={10} order={1.2} />
                                <PlaybackRateMenuButton
                                    rates={[0.5, 1, 1.5, 2]}
                                    order={7.1}
                                />
                            </ControlBar>

                            {
                                isVideoEnd && (
                                    <div
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                                        }}
                                        className="absolute inset-0 z-[100] grid h-full place-content-center"
                                    >
                                        {
                                            !completedLectures.includes(subSectionId) && (
                                                <ModalButton
                                                    disabled={loading}
                                                    onClick={handleLectureComplete}
                                                    text={!loading ? "Mark As Completed" : "Loading"}
                                                    customClasses="text-xl max-w-max px-4 mx-auto"
                                                />
                                            )
                                        }

                                        <ModalButton
                                            disabled={loading}
                                            onClick={() => {
                                                if (playerRef?.current) {
                                                    playerRef.current?.seek(0);
                                                    setIsVideoEnd(false);
                                                }
                                            }}
                                            text="Re-Watch"
                                            customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                                        />

                                        <div className='mt-8 flex min-w-[250px] justify-center gap-x-4 text-xl'>
                                            {!isFirstVideo() && (
                                                <button
                                                    disabled={loading}
                                                    onClick={goToPrevVideo}
                                                    className='blackButton'>
                                                    Prev
                                                </button>
                                            )}
                                            {!isLastVideo() && (
                                                <button
                                                    disabled={loading}
                                                    onClick={goToNextVideo}
                                                    className='blackButton'>
                                                    Next
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )
                            }
                        </Player>
                        <div className="sm:absolute bottom-7 left-0 w-full p-2  bg-black bg-opacity-75">
                            <h1 className="text-xl font-semibold">{videoData?.title}</h1>
                            <p className="text-xs">{videoData?.description}</p>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default VideoDetails;
