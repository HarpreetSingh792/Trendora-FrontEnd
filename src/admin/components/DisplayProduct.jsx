import React from 'react'

const DisplayProduct = ({ id, name, price, imgSrc, inStock }) => {
  return (
    <div className='grid place-items-center relative md:h-full shadow-4xl md:w-3/5 min-[320px]:w-full min-[320px]:h-30rem'>
      <p className='absolute top-4 right-4 rounded-md bg-green-100/50 text-green-500 font-semibold p-1 '>{inStock} Available</p>
      <div className='mt-14 h-fit grid gap-4 w-72'>
        <p className='text-gray-400'>ID- {id}</p>
        <img className='shadow-md m-auto' src={imgSrc} alt={`${name}-img`} width={200} />
      </div>
      <p className='font-semibold text-gray-700 text-sm px-8 text-justify'>{name}</p>
      <p className='font-bold text-2xl'>₹{price}</p>
    </div>
  )
}

export default DisplayProduct