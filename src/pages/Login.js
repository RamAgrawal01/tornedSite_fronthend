
import Template from "../components/core/auth/Template";
import loginImage from "../assets/loginsignupimages/855418-hd_1920_1080_25fps.gif";

const Login = ({setIsLoggedIn}) =>{
    
        return(
            <Template
        title="Welcome Back"
        desc1="Build skills for today, tomorrow and beyond"
        desc2="Education to future-proof your carrear"
        image={loginImage}
        formtype="login"
        setIsLoggedIn={setIsLoggedIn}
        />
        )
}
export default Login;