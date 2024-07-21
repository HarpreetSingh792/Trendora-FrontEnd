import React from 'react'
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className='h-[calc(100vh-3rem)] w-full flex flex-col  justify-start items-center p-4 gap-2'>
            <img  className='md:w-fit md:h-fit' src='/404.png' alt=""></img>
            <button onClick={() => navigate("/")} className=" min-w-fit md:w-1/5 min-[320px]:w-11/12 transition-all  border-2 border-black rounded-md py-2 px-4 text-black cursor-pointer hover:bg-black hover:text-white disabled:opacity-25 disabled:cursor-not-allowed" >Go Back To Home</button>
        </div>
    )
}

export default Error