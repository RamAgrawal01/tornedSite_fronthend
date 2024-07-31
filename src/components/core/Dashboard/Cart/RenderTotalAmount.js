import React from 'react';
import ModalButton from '../../../common/ModalButton';
import { useSelector } from 'react-redux';
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';
import {useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const RenderTotalAmount = () => {

    const {total , cart} = useSelector((state)=>state.cart);
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleBuyCourse = async() => {
        const courses = cart.map((course)=>course._id);
        await buyCourse(token,courses ,user,navigate,dispatch )
        
    }
    return(
        <div className="w-[40%] mt-5 flex flex-col">
        <div className="flex flex-col h-[100%] justify-between p-5 gap-5 my-14">
          <div className="flex flex-col gap-5 ">
            <div className="font-semibold text-xl text-orange-200">
              Your Cart
            </div>
            <div className="font-semibold text-5xl text-orange-100  -mt-5">
              Summary
            </div>
            <p className="text-xl">
              <span className="text-navyblue-50 font-semibold text-xl">
                Total Items: {cart.length}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-xl font-bold">
            <span className="text-navyblue-50 font-semibold">
              Total Amount:
            </span>{" "}
           <p className='text-navyblue-100'> Rs {total}</p> 
          </p>

          <ModalButton
          text ="Buy Now"
          onClick={handleBuyCourse}
          customClasses="mt-3"
          />


          {/* <button className="bg-green-700 w-[30%] hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2
           border-green-600 font-bold hover:text-green-700 p-3 text-xl mr-10">
            CheckOut Now
          </button> */}
        </div>
      </div>
  

            

           
  
    )
}
export default RenderTotalAmount;