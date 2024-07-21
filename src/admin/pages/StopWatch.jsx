import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../components/Layout'

const formatTimer = (seconds) => {
    const hour = String(Math.floor(seconds / 3600));
    const minute = String(Math.floor(seconds % 3600 / 60));
    const second = String(Math.floor(seconds % 60));
    const hourFormatter = hour.padStart(2, "0");
    const minuteFormatter = minute.padStart(2, "0");
    const secondFormatter = second.padStart(2, "0");
    return `${hourFormatter}:${minuteFormatter}:${secondFormatter}`
}
const StopWatch = () => {
    const [start, isStart] = useState(false);
    const [time, setTime] = useState(0);


    useEffect(() => {
        if (start) {

            const timeInterval = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000)
            return () => {
                clearInterval(timeInterval);
            }
        }
    }, [start])
    const resetHandler = () => {
        setTime(0);
    }
    return (
        <Layout>
            <div className='md:p-4 relative grid gap-8'>



                <h1 className='mt-8 min-[320px]:p-4 md:p-0 text-4xl font-semibold tracking-wider'>Stopwatch</h1>
                <div className='p-4 w-11/12 h-96 m-auto grid place-content-center place-items-center gap-4 '>
                        <h1 className='text-4xl font-semibold'>{formatTimer(time)}</h1>
                        <section className='flex justify-between items-center gap-4'>
                            <button className={`transition-all  border-2 ${start?"border-blue-500 text-blue-500 hover:bg-blue-500":"border-green-300 text-green-500 hover:bg-green-300"} rounded-md py-1 px-4  cursor-pointer  hover:text-white`} onClick={() => isStart(prev => !prev)}>{start ? "Stop" : "Start"}</button>
                            <button className="transition-all  border-2 border-red-500 rounded-md py-1 px-4 text-red-500 cursor-pointer hover:bg-red-500 hover:text-white" onClick={resetHandler}>Reset</button>
                        </section>
                </div>
            </div>
        </Layout>
    )
}

export default StopWatch