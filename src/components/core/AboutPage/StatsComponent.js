import React from "react";

const StatsComponent = () => {

const stats = [
    {count:"5k" , label:"Active Students"},
    {count:"10+" , label:"Mentors"},
    {count:"50+" , label:"Courses"}
];

    return(
        <div className="bg-navyblue-700 ">
            <div className="grid grid-cols-2 lg:grid-cols-3 text-center w-11/12 max-w-maxContent
             mx-auto  font-semibold">
                {
                    stats.map((element,index)=>{
                        return(
                            <div key={index} className="flex flex-col py-7">
                                <h1 className="text-[30px] text-navyblue-50">{element.count}</h1>
                                <h2 className="font-bold text-[20px] text-navyblue-400">{element.label}</h2>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
export default StatsComponent;