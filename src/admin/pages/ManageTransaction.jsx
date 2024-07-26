import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeleterOrderMutation, useGetSingleOrderQuery, useProcessOrderMutation } from "../../redux/api/orderApi"
import { IoMdTrash } from "react-icons/io";
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ManageTransaction = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data,isError } = useGetSingleOrderQuery(id);
    const [updateStatus] = useProcessOrderMutation();
    const [deleteOrder] = useDeleterOrderMutation();
    const { _id } = useSelector(state => state.userReducer.user)

    const changeProcessStatusHandler = () => {
        Promise.resolve(updateStatus({ orderId: data?.order._id, userId: _id })).then((res) => toast.success(res.data.message)).catch((error) =>toast.error("Something went wrong"));
    }

    const deleteOrderHandler=async()=>{
        try {
            const res = await deleteOrder({ orderId: data?.order._id, userId: _id })
            toast.success("Order deleted Successfully");
            navigate(-1)
        } catch (err) {
            toast.error(err.error.data.messages);
        }
    }
    if (isError) return navigate("*")
    return (
        < div className='mt-6 md:h-[34rem] w-4/5 m-auto min-[320px]:grid md:flex md:justify-start md:items-center md:gap-4 min-[320px]:gap-8 mb-2' >


            <section className='flex flex-col justify-start gap-4 items-center md:h-full shadow-4xl md:w-3/5 min-[320px]:w-full min-[320px]:h-30rem p-4'>
                <h3 className='font-semibold tracking-wide text-center text-gray-500 w-full text-2xl uppercase '>Order Items</h3>
                <div className='mt-2 overflow-auto w-full  p-2 flex flex-col justify-start items-center'>

                    {
                        data?.order.orderItems.map((item) => (
                            <div className='border-2 w-full min-h-12 max-h-full flex justify-between  items-center p-2 gap-4 mt-4' key={item._id}>
                                <img className='w-20 h-20 border-2' src={item.photo} alt={`${item.name}-img`} />
                                <p className='min-[320px]:text-[10px] md:text-base font-semibold w-3/5 '>{item.name}</p>
                                <p className='min-[320px]:text-[10px] md:text-base font-semibold w-1/5'>{item.price} x {item.quantity} = {item.price * item.quantity}</p>
                            </div>
                        ))
                    }
                </div>
            </section>
            < section className='shadow-4xl min-h-30rem max-h-100 md:h-full md:w-1/3 w-full flex flex-col justify-start gap-4 items-start relative p-4 ' >
                <button className='absolute bg-red-500/20 p-2 rounded-full text-red-500 text-xl -top-4 -right-4 z-50' onClick={deleteOrderHandler}><IoMdTrash /></button>
                <h3 className='font-semibold tracking-wide text-center text-gray-500 w-full text-2xl uppercase'>Order Info</h3>

                <div className='w-full flex flex-col justify-start items-start gap-2'>
                    <h4 className='font-bold text-start w-full text-md '>User Info</h4>
                    <h6 className='flex flex-wrap gap-2 font-semibold text-gray-400 text-start w-full text-sm'>Name: <p className="font-bold text-gray-600">{data?.order.user.name}</p> </h6>
                    <h6 className='flex flex-wrap gap-2 font-semibold text-gray-400 text-start w-full text-sm break-words'>Address: <p className="font-bold text-gray-600">{data?.order.shippingInfo.address}, {data?.order.shippingInfo.city}, {data?.order.shippingInfo.state}, {data?.order.shippingInfo.pincode}, {data?.order.shippingInfo.country}</p></h6>
                </div>
                <div className='w-full flex flex-col justify-start items-start gap-2'>
                    <h4 className='font-bold text-start w-full text-md '>Amount Info</h4>
                    <h6 className='flex items-center gap-2 font-semibold text-gray-400 text-start w-full text-sm'>Subtotal: <p className="font-bold text-gray-600">{data?.order.subTotal}</p></h6>
                    <h6 className='flex items-center gap-2 font-semibold text-gray-400 text-start w-full text-sm'>Shipping Charges: <p className="font-bold text-gray-600">{data?.order.shippingCharges}</p></h6>
                    <h6 className='flex items-center gap-2 font-semibold text-gray-400 text-start w-full text-sm'>Tax: <p className="font-bold text-gray-600">{data?.order.tax}</p></h6>
                    <h6 className='flex items-center gap-2 font-semibold text-gray-400 text-start w-full text-sm'>Discount: <p className="font-bold text-gray-600">{data?.order.discount}</p></h6>
                    <h6 className='flex items-center gap-2 font-semibold text-gray-400 text-start w-full text-sm'>Total: <p className="font-bold text-gray-600">{data?.order.total}</p></h6>
                </div>
                <div className=' w-full flex flex-col justify-start items-start gap-2'>
                    <h4 className='font-bold text-start w-full text-md '>Status Info</h4>
                    <h6 className='font-semibold text-gray-400 text-start w-full text-sm'>Status: <p className={`font-bold ${data?.order.status === 'Processing' ? "text-red-500" : data?.order.status === "Delivered" ? "text-green-500" : "text-yellow-500"}`}>{data?.order.status}</p> </h6>
                </div>
                <button className="m-auto md:w-3/4 min-[320px]:w-11/12 transition-all  border-2 border-blue-500 rounded-md py-2 px-4 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed" onClick={changeProcessStatusHandler}>Process Status</button>

            </ section>
        </div >
    )
}

export default ManageTransaction