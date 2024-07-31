import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/md"
import * as Icon2 from "react-icons/io5"
import * as Icon4 from "react-icons/fa"

const contactDetails = [
  {
    icon: "MdOutlineWhatsapp",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "send whatsapp 9406853538",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "173, pratap nagar Mayur vihar phase 1 New delhi , 110091",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+91 9549808067",
  },
  {
    icon: "FaDownload",
    heading: "Download Our App",
    description: "Mon - Fri From 8am to 5pm",
    details: "App has more advantages go and download from above link",
  },
]

  const ContactDetails = () => {
    return (
        <div className="flex flex-col gap-6 rounded-lg bg-navyblue-800 p-4 lg:p-6">
          {contactDetails.map((ele, i) => {
            let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon] || Icon4[ele.icon]
            return (
              <div
                className="flex flex-col gap-[2px] p-3 text-sm text-orange-50"
                key={i}
              >
                <div className="flex flex-row items-center gap-3">
                  <Icon size={25} />
    
                  <h1 className="text-lg font-semibold text-navyblue-50">
                    {ele?.heading}
                  </h1>
                </div>
    
                <p className="font-medium">{ele?.description}</p>
                <p className="font-semibold">{ele?.details}</p>
              </div>
            )
          })}
        </div>
      )
  }
  export default ContactDetails;