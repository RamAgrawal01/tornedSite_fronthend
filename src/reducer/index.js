import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"
import mediaQueryReducer from "../slices/mediaQuery"
import sidebarSlice from "../slices/sidebarSlice";
import viewCourseReducer from "../slices/viewCourseSlice"
import courseReducer from "../slices/courseSlice"
const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    sidebar:sidebarSlice,
    viewCourse: viewCourseReducer,
    course: courseReducer
})

export default rootReducer