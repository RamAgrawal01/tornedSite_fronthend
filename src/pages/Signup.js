import React from "react";
import Template from "../components/core/auth/Template";
import signupImage from "../assets/loginsignupimages/________.gif";

const Signup = ({setIsLoggedIn}) =>{
    return(
<Template
        title="Join thousands of Students excelling in Competitions"
        desc1="Build skills for today,tomorrow , and beyond"
        desc2="Education to future-proof your carrear"
        image={signupImage}
        formtype="signup"
        setIsLoggedIn={setIsLoggedIn}
        />
    )
        
}
export default Signup;