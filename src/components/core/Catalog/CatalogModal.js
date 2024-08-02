import React, { useEffect } from 'react';
import { useState } from 'react';
import { apiConnector } from '../../../services/apiConnector';
import { categories } from '../../../services/api';
import Loader from '../../common/Loader';
import { Link } from 'react-router-dom';
import { GiSplitCross } from "react-icons/gi";


const CatalogModal = ({setCatalogModal}) => {

    const [loading , setLoading] = useState(false);
    const [subLink , setSubLink] = useState([]);


    const fetchSubLink = async () => {
        try {
            setLoading(true);
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing results: ", result);
            setSubLink(result.data.data || []);
        } catch (err) {
            console.log("Error : ", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSubLink();
    }, []);


    return(
        <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
            <div className='w-10/12 max-w-[350px] rounded-lg border-moving-lines bg-navyblue-900 p-6'>

            <div className='flex justify-between'>
                <h1 className='text-center text-2xl text-orange-300 animate-pulse'>Select categories</h1>

                <button className='text-navyblue-400 text-2xl'>
                        <GiSplitCross onClick={()=>setCatalogModal(false)}  />
                </button>
            </div>

            {
                loading ? (<div> <Loader/> </div>) :

               subLink.length ? (
                <div className='text-navyblue-100 text-lg text-center flex flex-col gap-3 my-3 '>
                {subLink.map((subLink,index)=>(
                    <Link to ={`/catalog/${subLink.name
                        .split(" ").
                        join("-").
                        toLowerCase()}`}

                        key={index}
                        >
                        <p className='hover:scale-105 transition-all duration-200 hover:text-navyblue-300'>{subLink.name}</p>

                        </Link>

                ))}
                </div>
               ) : (<p>No Catalog Found</p>)
            }

            </div>
        </div>

    )
}
export default CatalogModal;