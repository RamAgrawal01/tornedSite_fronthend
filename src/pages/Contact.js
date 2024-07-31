import React from 'react';
import Footer from '../components/common/Footer';
import ContactDetails from '../components/core/ContactPage/ContactDetails';
import ContactForm from '../components/core/ContactPage/ContatcForm';
const Contact = () => {
    return(
        <div>
            
            <div className='mx-auto mt-20 w-11/12 max-w-maxContent flex lg:flex-row flex-col text-white gap-[4rem]'>
                 <div className='lg:w-[40%]'>
                    <ContactDetails/>
                 </div>

                 <div className=''>
                    <ContactForm/>
                 </div>
            </div>

            {/* SECTION 6 */}
            <section>
            <h2 className="text-center lg:text-4xl text-3xl font-semibold text-white my-5">
            Review from Other Learners</h2>
            </section>

             {/* SECTION 7 */}
             <div>
               <Footer/>
               </div>

           
        </div>
    )
}
export default Contact;