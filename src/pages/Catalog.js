import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { catalogData, categories } from '../services/api';
import { apiConnector } from '../services/apiConnector';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import Footer from '../components/common/Footer';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';

const Catalog = () => {
    const { CATEGORIES_API } = categories;
    const { catalogName } = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [categoryId, setCategoryId] = useState("");
    const [active , setActive] = useState(1);
  
    // Fetch categories when catalogName changes
    useEffect(() => {
      const getCategory = async () => {
        try {
          const response = await apiConnector("GET", CATEGORIES_API);
          console.log("RESPONSE OF GET CATEGORY: ", response);
          
          const category = response?.data?.data?.find((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName);
          //if i not set the conditon then it automatically set as null
          if (category) {
            setCategoryId(category._id);
          } else {
            setCategoryId("");
          }
        } catch (error) {
          console.error("Error fetching category:", error);
        }
      };
      getCategory();
    }, [catalogName]);
  
    // Fetch catalog page data when categoryId changes
    useEffect(() => {
      if (categoryId) {
        (async () => {
          setLoading(true);
          try {
            const res = await getCatalogPageData(categoryId);
            console.log("RESPONSE OF CATALOG PAGE DATA: ",res)
            setCatalogPageData(res);
          } catch (error) {
            console.error("Error fetching catalog page data:", error);
          }
          setLoading(false);
        })();
      }
    }, [categoryId]);


    
    return(

      <>

      {/* Hero Section */}
        <div className='box-content bg-navyblue-800 px-4'>
        <div className='mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent '>
                <p className='text-sm text-navyblue-300'>{'Home/Catalog'}
                    <span className='text-orange-300'>{catalogPageData?.data?.selectedCategory?.name}</span>
                </p>
                <p className='text-3xl text-navyblue-50'>{catalogPageData?.data?.selectedCategory?.name}</p>
                <p className='max-w-[870px] text-navyblue-200'>{catalogPageData?.data?.selectedCategory?.description}</p>
            </div>
        </div>
            
            

            
            {/* SECTION 1 */}
       <div className='w-full max-w-maxContentTab lg:max-w-maxContent mx-auto box-content px-4 py-12 '>
       
                <h1 className='section_heading'>Courses to get you started</h1>
                <div className='my-4 flex border-b border-b-navyblue-600 text-sm'>
                    
                    <p
                    className={`px-4 py-2 ${active === 1
                      ? "border-b border-b-orange-300 text-orange-300"
                      : "text-navyblue-100"
                      } cursor-pointer`}
                      onClick={()=>setActive(1)}>
                      
                      Most Popular</p>

                      <p
                    className={`px-4 py-2 ${active === 2
                      ? "border-b border-b-orange-300 text-orange-300"
                      : "text-navyblue-100"
                      } cursor-pointer`}
                      onClick={()=>setActive(2)}>
                      
                      New</p>
                </div>

                <div>
                     <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses}/>
                </div>
               
         
       </div>
            

            {/* SECTION 2 */}
            <div className='w-full max-w-maxContentTab lg:max-w-maxContent mx-auto box-content px-4 py-12 '>
                <h1 className='section_heading'>Top Courses in {catalogPageData?.data?.differentCategory?.name} </h1>
                <div>
                    <CourseSlider Courses = {catalogPageData?.data?.differentCategory?.courses}/>
                </div>
            </div>

            {/* SECTION 3 */}
            <div className='w-full max-w-maxContentTab lg:max-w-maxContent mx-auto box-content px-4 py-12 '>
                <h1 className='section_heading'>Frequntly bought</h1>
                <div className='py-8'>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0,3).map((course,index)=>(
                                <Course_Card Course={course} key={index} Height={"h-[300px]"} />
                            ))
                        }

                    </div>

                </div>
            </div>
        

            <Footer/>
        
      </>
      
    )
}
export default Catalog;