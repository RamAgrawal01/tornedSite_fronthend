import React from "react";
import ChangeProfilePicture from "../components/core/Settings/ChangeProfilePicture";
import EditProfile from "../components/core/Settings/EditProfile";
import UpdatePassword from "../components/core/Settings/changePassword";
const Settings = () => {
    return(
        <>
        <h1 className="mb-14 text-4xl font-medium text-orange-200 text-center sm:text-left">
            Settings
        </h1>

        <ChangeProfilePicture/>
        <EditProfile/>
        <UpdatePassword/>
        </>
    )
}
export default Settings;