import React, { useState, useEffect } from 'react'
import { TfiStatsDown, TfiStatsUp } from "react-icons/tfi";

const Cards = ({ name, value, percentage, color }) => {
    return (
        <>
            <div className="h-32 flex  items-start justify-between gap-1 rounded-xl  bg-white shadow-4xl p-2 mb-4" key={name}>
                <div className='m-2 w-24'>
                    <p className=' text-black font-bold text-md'>{name}</p>
                    <h2 className='ml-[5px] mt-[8px] font-semibold text-xl'>₹{value}</h2>
                    <div className='mt-2 flex gap-2 text-sm  w-28 '>
                        <p className={`${percentage === 0 ? "text-orange-500" : percentage > 25 ? "text-[#63ECA1]" : "text-red-500"}`}>{percentage > 25 ? <TfiStatsUp /> : <TfiStatsDown />}</p>
                        <p className={`w-11/12 break-words ${percentage === 0 ? "text-orange-500" : percentage > 25 ? "text-[#01F569]" : "text-red-500"}`}>{percentage >= 0 ? "+" + percentage : percentage}%</p>

                    </div>

                </div>
                <div className='w-[100px] flex justify-center items-center'>
                    <CircularProgressbar
                        percentage={percentage}
                        color={color} />
                </div>
            </div>
        </>
    )
}

export default Cards



const CircularProgressbar = ({ color, percentage }) => {
    const [percent, setPercent] = useState(0);
    useEffect(() => {
        if(percentage>=1000){
            setPercent(percentage)
            return;
        }
        let counter = 0;
        const progress = setInterval(() => {
            if (Math.abs(percentage) === counter) {
                clearInterval(progress);
            }
            setPercent(counter);
            counter+=1;
        }, [20])
    }, [])
    return (
        <div className={`relative flex justify-center items-center w-20 h-20 rounded-[100%] before:absolute before:w-[60px] before:h-[60px] before:rounded-full  before:bg-white before:shadow-inner shadow-md `}
            style={{
                background: `conic-gradient(${color} ${(Math.abs(percent) / 100) * 360}deg,rgb(255, 255, 255) 0)`,
            }} >
            <h4 style={{ color: `${color}`, zIndex: 99 }} className={`${percentage>1000?"text-xs":"text-sm"}`}>{percentage >= 0 ? "+" + percent + "%" : "-" + percent + "%"}</h4>
        </div>
    )

}
