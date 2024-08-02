import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useState } from 'react';
import { useEffect } from 'react';
const RequiremetField = ({name , label , register,errors , setValue , getValues})=> {

    const [requirement , setRequirement] = useState("");
    const[requirementList , setRequirementList] = useState([]);

    useEffect(()=>{
        register(name , {
            required:true,
            validate:(value)=>value.length>0
        })
    },[])

    useEffect(()=>{
        setValue(name ,requirementList )
    },[requirementList])

    const handleAddRequirement = () => {
        if(requirement) {
            setRequirementList([...requirementList , requirement]);
            setRequirement("");
        }
    }
    
    const handleRemoveRequirement = (index) => {
        const updateRequirementList = [...requirementList];
        updateRequirementList.splice(index,1);
        setRequirementList(updateRequirementList)
    }

    return(
        <div className='flex flex-col space-y-2'>
            <label htmlFor={name} className='text-sm text-orange-100'>{label}<sup className='text-pink-200'>*</sup></label>
             <div className='flex flex-col items-start space-y-2'>
             <input
            type="text"
            id={name}
            value={requirement}
            onChange={(e)=>setRequirement(e.target.value)}
            className='input-style w-full'/>

            <button
            type="button"
            onClick={handleAddRequirement}
            className='font-semibold text-pink-200'>
                Add
            </button>
            </div>

            {requirementList.length > 0 && (
        <ul className="mt-2 list-inside list-disc ">
          {requirementList.map((requirement, index) => (
            <li key={index} className="flex items-center text-navyblue-50">
              <span>{requirement}</span>
              <button
                type="button"
                className="ml-2 text-xs text-navyblue-300 "
                onClick={() => handleRemoveRequirement(index)}
              >
                {/* clear  */}
                <RiDeleteBin6Line className="text-navyblue-400 text-sm hover:scale-125 duration-200" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
          
        </div>
          
      
    )
}
export default RequiremetField;