import React from "react"
import { useNavigate } from "react-router-dom";
import { FaMinus } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import { server } from '../redux/store';



export const CartCard = ({ _id, photo, name, quantity, description, stocks, price, addItemToCart, removeItemFromCart }) => {

    const navigate = useNavigate()  
  
    return (
      <div className='bg-white w-full border-2 rounded-md flex md:flex-row min-[320px]:flex-col justify-evenly items-center p-4 gap-4 mb-4'>
        <img className='w-16 cursor-pointer' src={`${server}/${photo}`} alt="" onClick={() => navigate(`/pd/${_id}`)} />
        <div className='grid w-11/12 cursor-pointer' onClick={() => navigate(`/pd/${_id}`)}>
          <h4 className='font-bold'>{name.substr(0, 50)}...</h4>
          <p className='text-gray-400 text-sm'>{description.substr(0, 50)}...</p>
          <p className='italic font-semibold'>₹{price}</p>
        </div>
        <div className='flex justify-evenly items-center h-full text-xl min-[320px]:w-full md:w-1/4'>
  
          <button className='flex  items-center justify-evenly gap-1 w-40 h-9 rounded-sm border-2 border-gray-500 p-1  font-bold cursor-pointer transition-all hover:bg-neutral-800 hover:border-neutral-800 hover:text-white' onClick={()=>removeItemFromCart(_id,price)}><FaMinus /></button>
          <input className='text-center text-lg w-12' type='number' value={quantity} max={stocks} min={1} readOnly />
          <button className='flex  items-center justify-evenly gap-1 w-40 h-9 rounded-sm border-2 border-gray-500 p-1 font-bold cursor-pointer transition-all hover:bg-neutral-800 hover:border-neutral-800 hover:text-white' onClick={()=>addItemToCart(_id)} ><MdAdd /> </button>
        </div>
      </div>
    )
  
  }