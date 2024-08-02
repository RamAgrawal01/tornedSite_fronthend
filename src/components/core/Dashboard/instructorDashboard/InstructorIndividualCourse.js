import React, { useEffect, useState } from 'react';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../common/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { GiReturnArrow } from 'react-icons/gi';
import RatingStars from '../../../common/RatingStars';
import Img from '../../../common/Img';
import { setScreenSize } from '../../../../slices/sidebarSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import './styles.css';
import { EffectCards, EffectCoverflow, Pagination } from 'swiper/modules';
import StudentsEnrolled from './StudentsEnrolled';

const InstructorIndividualCourse = () => {
    const { token } = useSelector((state) => state.auth);
    const { screenSize } = useSelector((state) => state.sidebar);
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [readMore, setReadMore] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await getInstructorData(token);
            if (result && result.success) {
                const selectedCourse = result.courses.find(course => course._id === courseId);
                setCourse(selectedCourse);
            }
            setLoading(false);
        };
        fetchData();
    }, [token, courseId]);

    // Hook to monitor and update screen size
    useEffect(() => {
        const handleResize = () => dispatch(setScreenSize(window.innerWidth));
        window.addEventListener('resize', handleResize);
        handleResize(); // Initialize the screen size on component mount
        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }

    if (!course) {
        return <div>Course not found</div>;
    }

    function readmoreHandler(){
        setReadMore(!readMore);
    }

    return (
        <>
            {/* Individual overall Details */}
            <div className="w-full bg-navyblue-800 overflow-hidden">
                <div className="mx-auto box-content 2xl:relative">
                    <div className="mx-auto lg:flex lg:justify-between min-h-[350px] lg:max-w-full max-w-maxContentTab justify-items-center p-8 lg:mx-0 lg:py-0">
                        <div className="w-[60%]">
                            <div className="mb-5 lg:mt-10 lg:mb-0 z-[100]" onClick={() => navigate(-1)}>
                                <GiReturnArrow className="w-10 h-10 text-yellow-100 hover:text-yellow-50 cursor-pointer" />
                            </div>
                            {/* Course data */}
                            <div className="mb-5 flex flex-col justify-center gap-4 py-5 text-lg text-navyblue-50">
                                <p className="text-4xl font-bold text-navyblue-50 sm:text-[42px]">
                                    {`${course.courseName} Batch Information`}
                                </p>
                                <p className="text-navyblue-200">{course.courseDescription}</p>
                                <div className="text-md flex flex-wrap items-center gap-3">
                                    <span className="text-yellow-25">{course.averageRating}</span>
                                    <RatingStars Review_Count={course.averageRating} Star_Size={24} />
                                    <span>{course.allReviews?.length}</span>
                                </div>
                                <span>{`Total Students Enrolled in this batch :👨‍🎓 ${course.totalStudentsEnrolled}`}</span>
                                <span>{`Total Income Generated in this batch : 💰 ${course.totalAmountGenerated}`}</span>
                            </div>
                        </div>
                        <div className="w-[30%] flex justify-center items-center">
                            <Img src={course.courseThumbnail} className="rounded-3xl shadow-lg shadow-pink-200" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Cards */}
            <div className="my-8">
                <h2 className="text-2xl text-orange-200">Know, What Students Say About You</h2>
                <Swiper
                    effect={screenSize < 640 ? "cards" : "coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    spaceBetween={screenSize < 640 ? 0 : 10}
                    slidesPerView={screenSize < 640 ? 1 : 3}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    cardsEffect={{
                        slideShadows: true,
                    }}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Pagination, EffectCards]}
                    className="mySwiper"
                >
                    {course.allReviews.map((review, index) => {
                        
                        const wordCount = review.review.split(' ').length;
                        console.log("word count: ",wordCount)
                        const fullReview = readMore   ? review.review : `${review.review.substring(0, 35)}...`;

                        return (
                            <SwiperSlide key={index}>
                                <div className="flex items-center justify-center mx-auto">
                                    <div className="flex flex-col w-[430px] min-h-[minContent] mt-10 bg-navyblue-800 backdrop-blur-2xl p-5 rounded-lg shadow-xl shadow-pink-200 hover:border-yellow-50">
                                        <h1 className="text-2xl bg-pink-200 text-navyblue-50 rounded-2xl py-1 px-2 backdrop-blur-sm w-fit">
                                            {`${review.rating === 5 ? "Excellent" : review.rating >= 2.5 && review.rating < 5 ? "Very Good" : "Good"}`}
                                        </h1>
                                        <div className="flex flex-col lg:flex-row my-3 w-full justify-between gap-12">
                                            <div className="flex flex-col flex-1 gap-3">
                                                <h2 className="text-navyblue-50">{`${review.user.firstName} gives you ${review.rating} rating`}</h2>
                                                <RatingStars Review_Count={review.rating} Star_Size={35} className="mx-auto" />
                                                <p className="text-navyblue-200">
                                                    {fullReview}
                                                
                                                        <span className={`text-orange-300 cursor-pointer `} onClick={readmoreHandler}>
                                                            {readMore ? `Read Less` : `Read More`}
                                                        </span>
                                                    
                                                </p>
                                            </div>
                                            <div className={`flex lg:justify-end w-[30%] ${screenSize < 640 ? "mx-auto" : "justify-end"}`}>
                                                <Img src={review?.user?.image} className="h-28 w-28 rounded-full aspect-square" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-navyblue-100">~{review.user.firstName} {review.user.lastName}</p>
                                            <p className="text-sm text-navyblue-100">{review.user.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>

                <div>
                    <StudentsEnrolled course={course} screenSize={screenSize} />
                </div>
            </div>
        </>
    );
}

export default InstructorIndividualCourse;
