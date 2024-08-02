import React, { useState } from 'react';
import { Chart, registerables } from 'chart.js/auto';
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

const InstructorChart = ({ instructorData }) => {
    const [currentChart, setCurrentChart] = useState("students");

    // Function to generate random colors
    const getRandomColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            colors.push(color);
        }
        return colors;
    };

    // Create data for chart displaying student information
    const chartDataForStudents = {
        labels: instructorData.map((course) => course.courseName),
        datasets: [
            {
                data: instructorData.map((course) => course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(instructorData.length)
            }
        ]
    };

    // Create data for chart displaying income information
    const chartDataForIncome = {
        labels: instructorData.map((course) => course.courseName),
        datasets: [
            {
                data: instructorData.map((course) => course.totalAmountGenerated),
                backgroundColor: getRandomColors(instructorData.length)
            }
        ]
    };

    // Create options (you can customize these)
    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'white', // Set your desired color
                    font: {
                        size: 14, // Set your desired font size
                    }
                }
            }
        }
    };

    return (
        <div className='flex flex-1 flex-col gap-y-4 rounded-lg bg-navyblue-800 p-6'>
           <div className='flex justify-between'>
           <h1 className='text-2xl font-bold text-orange-200'>Visualize your stats</h1>
            <div className='flex gap-4 font-semibold'>
                <button onClick={() => setCurrentChart("students")}
                    className={`${currentChart==="students" ? "bg-pink-100 text-black " : "text-pink-100"}
                    rounded-md p-1 px-3 transition-all duration-200`}>
                    Students
                </button>
                <button onClick={() => setCurrentChart("income")}
                    className={`${currentChart==="income" ? "bg-pink-100 text-black " : "text-pink-100"}
                    rounded-md p-1 px-3 transition-all duration-200`}>
                    Income
                </button>
            </div>
           </div>
            <div className='relative mx-auto aspect-square h-full w-full'>
                <Pie
                    data={currentChart === 'students' ? chartDataForStudents : chartDataForIncome}
                    options={options}
                />
            </div>
        </div>
    );
};

export default InstructorChart;