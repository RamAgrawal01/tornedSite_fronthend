import React from 'react'
import Img from '../../common/Img'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'
import { CiEdit } from "react-icons/ci";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ModalButton from '../../common/ModalButton';
import { deleteUserProfileImage, updateUserProfileImage } from '../../../services/operations/settingAPI';
import { useEffect } from 'react';
import { IoIosCloudUpload } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";

const ChangeProfilePicture = () => {

    const{token} = useSelector((state)=>state.auth)
    const{user} = useSelector((state)=>state.profile)
    const dispatch = useDispatch();

    const[deleteLoading ,setDeleteLoading] = useState(false);
    const[updateLoading,setUpdateLoading] = useState(false);
    const[profileImage,setProfileImage] = useState(null);
    const[previewImage, setPreviewImage] = useState(null);

    const fileRef = useRef(null)

    const clickHandler=()=>{
        fileRef.current.click();
    }

    const fileChangeHandler=(e)=>{
        const file = e.target.files[0]
        if(file){
            setProfileImage(file)
            previewFile(file)
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend=()=>{
            setPreviewImage(reader.result)
        }
    }

    const handleFileUpload = () => {
        try{
            setUpdateLoading(true);
            const formData = new FormData()
            formData.append("profileImage",profileImage)
            dispatch(updateUserProfileImage(token, formData)).then(() => {
                setUpdateLoading(false)
              })
        }
        catch(err){
            console.log("ERROR MESSAGE WHILE CHANGE PROFILE: ",err.message);
        }
    }

    const deleteHandler = () => {
        
        try{
            setDeleteLoading(true);
            dispatch(deleteUserProfileImage(token)).then(() => {
                setDeleteLoading(false)
        })
        }
        catch(err){
            setDeleteLoading(true);
            console.log("ERROR MESSAGE WHILE DELETING  PROFILE: ",err.message);
            setDeleteLoading(false);
        }
      
    }

    useEffect(() => {
        if (profileImage) {
          previewFile(profileImage)
        }
      }, [profileImage])



    return(
    <>
    <div className='flex items-center justify-between rounded-3xl border-[2px] border-navyblue-700
    bg-navyblue-800 p-8 px-3 sm:px-12 '>
        <div className='flex items-center gap-x-10'>
         
        <div className="relative"> {/* Adjust width and height as needed */}
      <Img
        src={previewImage || user?.image}
        alt={`profile-${user?.firstName}`}
        className="aspect-square w-[90px] h-[92px] object-cover rounded-full"
      />
      <button
        onClick={clickHandler}
        disabled={updateLoading || deleteLoading}
        className="cursor-pointer absolute bottom-0 right-0  p-1 bg-pink-200 rounded-full shadow hover-float"
      >
        <CiEdit />
      </button>
        </div>
                    
    
             <div className='space-y-5'>
                <p className='font-semibold text-base text-navyblue-100 '>Change Profile Image</p>

                <div className='flex flex-col sm:flex-row gap-3'>
                    <input
                    type="file"
                    ref={fileRef}
                    onChange={fileChangeHandler}
                    className='hidden'
                    accept='image/png, image/jpeg , image/jpg'
                    />

                    <button
                    disabled={deleteLoading || updateLoading}
                    onClick={deleteHandler}
                    className='cursor-pointer flex gap-x-2 items-center rounded-lg font-semibold py-2 px-5 bg-pink-200 text-richblack-900 hover:bg-richblack-900 hover:text-pink-200 '>
                        {
                            deleteLoading? "Deleting..." : "Delete Image"
                        }
                        {
                            !deleteLoading&&(
                                <span>
                                     <MdOutlineDeleteOutline className="text-lg"/>
                                </span>
                               
                            )
                        }
                    </button>

                    <ModalButton
                    text={updateLoading?"Wait...":"Upload"}
                    onClick={handleFileUpload}>

                    {
                        !updateLoading && (
                            <IoIosCloudUpload className="text-lg" />
                        )
                    }
                    </ModalButton>

                  
                </div>
            </div>
        </div>
    </div>
    </>
    )
}
export default ChangeProfilePicture;