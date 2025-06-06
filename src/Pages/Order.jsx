import React, { useEffect, useState } from 'react'
import { useGetMyOrderQuery } from '../redux/api/orderApi'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Order = () => {

  const navigate = useNavigate();
  const { _id } = useSelector(state => state.userReducer?.user ?? "");
  const { data, isLoading, isError, error } = useGetMyOrderQuery(_id);

  const [myOrders, setMyOrders] = useState([])

  useEffect(() => {
    if (!isLoading) setMyOrders(data?.orders);
  }, [isLoading])

  console.log(myOrders)
  if (isError) toast.error(error.data?.message)

  if (!myOrders.length >= 1) return <div className='flex flex-col items-center gap-4'> <div className='flex mt-12 justify-center text-4xl m-auto gap-4 items-center font-bold'>
    No Order Found 🛒
  </div>
    <button onClick={() => navigate("/")} className="md:w-1/5 min-[320px]:w-11/12 transition-all  border-2 border-black rounded-md py-2 px-4 text-black cursor-pointer hover:bg-black hover:text-white disabled:opacity-25 disabled:cursor-not-allowed" >Start Shopping</button>
  </div>
  return (
    <div className='border-2 p-4 w-full h-full overflow-auto flex flex-col justify-center items-center'>
      {
        myOrders?.map((item, idx) => (
          <div key={item._id} className='bg-white shadow-4xl w-11/12 rounded-lg flex flex-col justify-center items-start mb-4 p-4 gap-2' >
            <h2 className='font-bold text-md text-gray-700'>Order {idx + 1}:</h2>

            {
              item.orderItems?.map((orderItem, orderIdx) => (

                <div key={orderItem._id} className='p-4 w-full'>
                  <h4 className='font-semibold text-sm text-gray-500'>Item {orderIdx + 1}:</h4>
                  <div className='border-2 flex justify-between items-center p-4'>
                    <img className='w-16 h-16 ' src={orderItem.photo} alt={`${item.name}-img`} />
                    <p className='min-[320px]:text-[10px] md:text-base font-semibold w-3/4'>{orderItem.name}</p>
                    <p className='min-[320px]:text-[10px] md:text-base font-semibold  '>{orderItem.price} x {orderItem.quantity} = {orderItem.price * orderItem.quantity}</p>
                  </div>
                </div>
              ))
            }
            <p className={`font-bold ml-4  tracking-widest ${item.status === 'Processing' ? "text-red-500" : item.status === "Delivered" ? "text-green-500" : "text-yellow-500"}`}>{item.status}</p>
          </div>
        ))
      }
    </div>
  )
}

export default Order