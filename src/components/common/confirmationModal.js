import React from "react";
import ModalButton from "./ModalButton";
import { motion } from "framer-motion";
import { scaleUp } from "./motionFrameVarients";
const ConfirmationModal = ({modalData}) => {

    return(
        <motion.div 
        variants={scaleUp}
        initial='hidden'
        whileInView={'show'}
        viewport={{once:false,amount:0.1}}
       
        className="z-[1000] fixed inset-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            
            <div className="w-10/12 max-w-[350px] rounded-lg border border-navyblue-400 bg-navyblue-800 p-6">
                <p className="text-2xl font-semibold text-navyblue-50">{modalData.text1}</p>
                <p className="mt-3 mb-5 leading-6 text-navyblue-200">{modalData.text2}</p>

                <div className="flex items-center gap-x-4">
                    <ModalButton
                    onClick={modalData?.buttonHandler}
                    text={modalData?.buttonText}
                    />

                    <button onClick={modalData?.button2Handler}
                    className="cursor-pointer rounded-lg font-semibold py-2 px-5 bg-pink-200 text-richblack-900 hover:bg-richblack-900 hover:text-pink-200"> 
                        {modalData?.button2Text}

                    </button>
                </div>
            </div>
        </motion.div>
    )
}
export default ConfirmationModal;