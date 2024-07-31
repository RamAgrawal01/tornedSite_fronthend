import React from 'react';
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';
import { useSelector } from 'react-redux';
export default function Cart () {

    const {total , totalItems} = useSelector((state)=>state.cart);
    console.log('Toal: ',total)
    
     return(
        <div>
            <h1 className='mb-14 text-3xl font-medium text-orange-200 text-center sm:text-left'>Your Cart</h1>
            <p className='border-b border-b-navyblue-400 pb-2 font-semibold text-navyblue-400'>{totalItems} Courses in Cart</p>

            {total>0 ? 
            (<div className='mt-8 flex flex-col-reverse  gap-x-10 gap-y-6 lg:flex-row'> 

            <div className='w-[60%]'>
            <RenderCartCourses/>
            </div>
            
            <RenderTotalAmount/>
             </div>) 

            :
             (<div className='mt-14 text-center text-3xl text-navyblue-100'>Your cart is Empty</div>)

            }
        </div>
     )
}