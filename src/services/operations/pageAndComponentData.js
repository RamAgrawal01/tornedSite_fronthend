import React from 'react'
import toast from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { catalogData } from '../api';

export const getCatalogPageData = async(categoryId) => {

    const {CATALOGPAGEDATA_API} = catalogData

    const toastId = toast.loading("Loading..");
    let result = [];

    try{
        const response = await apiConnector("POST" ,CATALOGPAGEDATA_API,
            {categoryId : categoryId,} );

        if(!response?.data?.success){
            toast.error(response.data.message);
            throw new Error(response.data.message);

        }

         result = response?.data
    }
    catch(error){
        console.log("CATALOG PAGE DATA API RESPONSE: " ,error);
        toast.error(error.message);
        result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;


}