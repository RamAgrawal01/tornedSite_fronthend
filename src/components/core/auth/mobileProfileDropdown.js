import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCourseCategories } from '../../../services/operations/courseDetailsAPI';
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { AiOutlineCaretDown, AiOutlineHome } from "react-icons/ai"
import { MdOutlineContactPhone } from "react-icons/md"
import { TbMessage2Plus } from "react-icons/tb"
import { PiNotebook } from "react-icons/pi"
import { TbReportSearch } from "react-icons/tb";
import useOnClickOutside from '../../../customhook/useOnClickOutside';
import { Link } from 'react-router-dom';
import CatalogModal from '../Catalog/CatalogModal';

const MobileProfileDropDown = () => {
    
    const ref = useRef(null);

    const { user } = useSelector((state) => state.profile);
    
    const [open, setOpen] = useState(false);
    const [subLinks, setSubLinks] = useState([]);
    const [catalogModal  , setCatalogModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useOnClickOutside(ref, () => setOpen(false))

    const fetchSublinks = async () => {
        try {
            setLoading(true);
            const response = await fetchCourseCategories();
            setSubLinks(response);
        } catch (err) {
            console.log("Could not fetch the category: ", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSublinks();
    }, []);

    const handleClick = () => {
        setOpen(false);
        setCatalogModal(true);
      };


    return(

        <button className='relative sm:hidden' onClick={()=>setOpen(!open)}>
            <div className='flex items-center gap-x-2'>
                <img
                src={user?.image}
                alt="profile"
                className={`aspect-square w-[30px] rounded-full object-cover`}

                />

                <AiOutlineCaretDown className='text-sm text-navyblue-100' />
            </div>

        {
            open &&(
                
                <div
                onClick={(e) => e.stopPropagation()}
                className='absolute min-w-[120px] right-0 top-[2rem] z-[100] bg-navyblue-800 border-1px
                border-navyblue-600 text-navyblue-200 overflow-hidden rounded-lg divide-y-[1px] divide-richblack-300'
                ref={ref}>

                    <Link to='/dashboard/my-profile' onClick={()=>setOpen(false)}>
                    <div className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm'>
                    <VscDashboard className="text-lg" />
                        Dashboard
                    </div>
                    
                    </Link>

                    <Link to='/' onClick={()=>setOpen(false)}>
                    <div className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm'>
                    <AiOutlineHome className="text-lg" />
                        Home
                    </div>
                    
                    </Link>


                    <Link to='' onClick={handleClick}>
                       <div className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm'>
                       <PiNotebook className="text-lg" />
                           Catalog
                      </div>
                    </Link>

                    <Link to='/about' onClick={()=>setOpen(false)}>
                    <div className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm'>
                    <TbMessage2Plus className="text-lg" />
                        About Us
                    </div>
                    
                    </Link>

                    <Link to='/contact' onClick={()=>setOpen(false)}>
                    <div className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm'>
                    <MdOutlineContactPhone className="text-lg" />
                        Contact Us
                    </div>
                    
                    </Link>

                    <Link to='https://quiz-genius-theta.vercel.app/' onClick={()=>setOpen(false)}>
                    <div className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm'>
                    <MdOutlineContactPhone className="text-lg" />
                        Quiz Practice
                    </div>
                    
                    </Link>

                    <Link to='https://result-management-system-phi.vercel.app/' onClick={()=>setOpen(false)}>
                    <div className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm'>
                    <TbReportSearch className="text-lg" />
                        Results
                    </div>
                    
                    </Link>
                </div>
            )
        }

        {catalogModal && <CatalogModal setCatalogModal={setCatalogModal}/>}

        </button>


    )

}
export default MobileProfileDropDown;