import React from "react";
import ContactUsForm from "../ContactPage/ContactUsForm"
const ContactFormSection = () => {

    return(
        <div className="mx-auto border-[1px] border-navyblue-500 lg:p-[6rem] p-[2rem] my-[2rem] bg-navyblue-900">
            <h1 className="text-center lg:text-4xl text-3xl font-semibold">
                Get in Touch
            </h1>
            <p className="text-center text-navyblue-200 mt-3">
                We'd love to here for you , Please fill Out this form
            </p>
            <div className="mt-12 mx-auto">
                <ContactUsForm/>
            </div>


        </div>
    )
}
export default ContactFormSection;