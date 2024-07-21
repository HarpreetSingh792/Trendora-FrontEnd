import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

export const Slider = ({ images }) => {

    const imgRef = useRef();

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex(prev => prev !== images?.length - 1 ? prev + 1 : 0);
    }

    const handlePrevious = () => {
        setCurrentIndex(prev => prev !== 0 ? prev - 1 : images?.length - 1);
    }

    const handleDotClick = (index) => {
        setCurrentIndex(index)
    }

    useEffect(()=>{
        const imgClass =   imgRef.current.className;
        const slideInterval=setInterval(()=>{

            imgRef.current.className= imgClass+"opacity-10";
            setCurrentIndex(prev=>prev<images?.length-1?prev+1:0)
            imgRef.current.className= imgClass+'opacity-100';
        },5000)
        
        return ()=>{
            clearInterval(slideInterval);
        }
    },[])


    return (
        <div className='w-full relative border-2 min-[320px]:py-4  md:p-4 md:px-20 flex justify-center items-center transition-all'>
            <img ref={imgRef} key={currentIndex} src={images[currentIndex]} alt={`advertisement-banner-${currentIndex}`} className='w-full lg:h-64 md:h-52 min-[320px]:h-20 ' />
            <button className='absolute left-0 flex justify-center items-center min-[320px]:text-4xl lg:text-6xl mix-blend-multiply' onClick={handlePrevious}>
                <IoIosArrowDropleft />
            </button>

            <button className='absolute -right-0 flex justify-center items-center min-[320px]:text-4xl lg:text-6xl  mix-blend-multiply' onClick={handleNext}>
                <IoIosArrowDropright />
            </button>
            <div className='absolute flex justify-center items-center bottom-0 w-1/2'>
                {images?.map((_, idx) => (<button key={idx} className='rounded-full text-slate-600/50' onClick={() => handleDotClick(idx)}><GoDotFill /></button>))}
            </div>

        </div>

    )
}
