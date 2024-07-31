import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { setUser } from "../../slices/profileSlice";
import { settingsEndpoints } from "../api";

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_ACCOUNT_API,
    DELETE_PICTURE_API

  } = settingsEndpoints

/************UPDATE USER PROFILE IMAGE****** */
export function updateUserProfileImage(token,formData){
    return async(dispatch) => {
        try{
            const response = await apiConnector("PUT" , UPDATE_DISPLAY_PICTURE_API,formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            )
            console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............", response);

            if(!response.data.success) {
                toast.error(response.data.message);
                throw new Error(response.data.message)
            }
            toast.success("Profile Picture Update Successfully");
            dispatch(setUser(response.data.data));

            // below line is must - if not code - then as we refresh the page after changing profile image then old profile image will show 
            // as we only changes in user(store) not in localStorage
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }
        catch (error) {
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
            toast.error("Could Not Update Profile Picture")
          }
        
    }
}
// *************DELETE USER PROFILE IMAGE******************//



export function deleteUserProfileImage(token) {
    return async (dispatch) => {
      try {
        const response = await apiConnector(
          "DELETE",
          DELETE_PICTURE_API,null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
  
        console.log("DELETE_PROFILE_PICTURE_API API RESPONSE............", response);
  
        if (!response.data.success) {
          toast.error(response.data.message);
          throw new Error(response.data.message);
        }
  
        toast.success("Profile Picture Deleted Successfully");
  
        // Update Redux store and localStorage with the updated user data
        dispatch(setUser(response.data.data));
        localStorage.setItem("user", JSON.stringify(response.data.data));
      } catch (error) {
        console.log("DELETE_PROFILE_PICTURE_API API ERROR............", error);
        toast.error("Could Not Delete Profile Picture");
      }
     
    };
  }

//   ***************UPDATE PROFILE ********************//
export function updateProfile(token, formData) {
  return async (dispatch) => {
    // console.log('This is formData for updated profile -> ', formData)
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data?.updatedUserDetails?.image
        ? response.data.updatedUserDetails?.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`

      dispatch(setUser({ ...response.data.updatedUserDetails, image: userImage }))

   
      // console.log('DATA = ', data)
      localStorage.setItem("user", JSON.stringify({ ...response.data.updatedUserDetails, image: userImage }));
      toast.success("Profile Updated Successfully")
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId)
  }
}

// **********************Change Password*************///
export async function changePassword(token , formData) {
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST", CHANGE_PASSWORD_API , formData , {
            Authorization: `Bearer ${token}`,
        })
        console.log("CHANGE PASSWORD RESPOSNE: ",response);

        if(!response.data.success){
            toast.error(response.data.message);
            throw new Error(response.data.message)
        }
        toast.success("Password Change Successfully");
    }catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

