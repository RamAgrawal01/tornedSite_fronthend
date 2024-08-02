import React from 'react'
import ContactUsForm from './ContactUsForm'

const ContactForm =()=>{
    return(
        <div className='border-[1px] border-navyblue-600 lg:p-[4rem] p-[2rem] rounded-lg flex flex-col'>
            <h1 className='lg:text-4xl text-3xl font-semibold text-orange-100'>
            Got a Idea? We&apos;ve got the skills. Let&apos;s team up
            </h1>
            <p className="mt-2 text-navyblue-300 font-semibold text-[16px]">
                 Tell us more about yourself and what you&apos;re got in mind.
            </p>

            <div className="mt-9">
             <ContactUsForm />
            </div>
        </div>
    )
}
export default ContactForm;