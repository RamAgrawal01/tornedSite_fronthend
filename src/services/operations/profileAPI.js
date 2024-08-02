import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../api"
import { logout } from "./authAPI"


const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API, } = profileEndpoints

// ********GET USER ENROLLED COURSES *********//
export async function getUserEnrolledCourses(token) {
    let result = [];
    try {
        const res = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null, 
            {
            Authorization: `Bearer ${token}`
        });

        console.log("GET USER ENROLLED COURSE RESPONSE API : ", res);

        if (!res.data.success) {
            toast(res.data.message);
            throw new Error(res.data.message);
        }

        result = res.data.data; // Set the result to the actual data
    } catch (error) {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
        toast.error("Could Not Get Enrolled Courses");
    }

    return result;
}


//**************Instructor Dashboard API********** */
export async function getInstructorData(token) {
    const toastId = toast.loading("Loading....");
    let result = [];
    // console.log("TOken: ",token)
    try {
        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API,null ,
             
            {
                Authorization: `Bearer ${token}`
            });

        console.log("GET INSTRUCTOR API DATA: ", response);

        // Check if response and data structure are valid
        if (response && response.data) {
            if (!response.data.success) {
                toast.error(response.data.message || 'Failed to fetch data');
                throw new Error(response.data.message || 'Unknown error occurred');
            }

            result = response.data || []; // Default to empty array if courses are undefined
        } else {
            toast.error('Unexpected response structure');
        }
    } catch (error) {
        console.error('GET INSTRUCTOR API ERROR: ', error);
        toast.error('Could not fetch instructor dashboard');
    } finally {
        toast.dismiss(toastId);
    }

    return result;
}