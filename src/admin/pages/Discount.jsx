import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoAddCircle } from "react-icons/io5";
import { useSelector } from 'react-redux';
import PopUp from '../../components/PopUp';
import { useAllDiscountCouponsQuery, useCreateDiscountCouponMutation, useDeleteCouponMutation } from '../../redux/api/dicountApi';
import BasicTable from '../components/BasicTable';
import Layout from '../components/Layout';


const Columns = [
    {
        "Header": "Coupon Code",
        "accessor": "code"
    },
    {
        "Header": "Discount",
        "accessor": "amount"
    },
    {
        "Header": "Delete Coupon",
        "accessor": "delete"
    },
]



const Discount = () => {
    const [openToCreate, setIsOpenToCreate] = useState(false);
    const [code, setCouponCode] = useState("");
    const [amount, setAmount] = useState("");
    const { _id } = useSelector(state => state.userReducer?.user);
    const [create] = useCreateDiscountCouponMutation();
    const [deleteCoupon] = useDeleteCouponMutation();
    const { data, isLoading, isError, error } = useAllDiscountCouponsQuery(_id);




    const createCoupon = async (e) => {
        try {
            e.preventDefault();
            const res = await create({ adminId: _id, data: { coupon: code, amount } })
            toast.success(res.data.message || `Coupon ${code} Created Succesfully`)
            setAmount("");
            setCouponCode("")
        } catch (error) {
            toast.error("Please enter both amount and coupon code")
        }

    }

    const deleteCouponHandler = async (id) => {
        try {
            const res = await deleteCoupon({ couponId: id, adminId: _id });
            toast.success(res?.data.message || "Coupon Deleted Successfully")
        } catch (error) {
            console.log(error)
            toast.error("Error while deleting coupon")
        }
    }

    const tableData = data?.coupons.map(item => (
        {
            code: <p className='italic bg-blue-200/10 text-blue-500 font-semibold'>{item.code}</p>,
            amount: <p className='text-red-500 font-bold'>- {item.amount}</p>,
            delete: <button className='text-red-500 underline' onClick={() => deleteCouponHandler(item._id)}>Delete</button>,
        }
    ))

    if (isError) toast.error(error.data?.message)
    return (
        <Layout>
            <div className='md:p-4 relative grid gap-8' >
                <div>
                    <h2 className='min-[320px]:p-4 md:p-0 text-4xl font-semibold tracking-wider'>
                        Discount Coupons
                    </h2>
                    <button onClick={() => setIsOpenToCreate(true)} className='fixed text-6xl text-blue-700 min-[320px]:top-3/4 md:top-14 right-8'>
                        <IoAddCircle />
                    </button>
                </div>
                {
                    !isLoading &&
                    <div className='overflow-auto'>
                        <BasicTable dataByProp={tableData} columns={Columns} pageSize={8} fillColor />
                    </div>
                }
            </div>
            {openToCreate && <PopUp isAdmin={true} setIsOpen={setIsOpenToCreate}>
                <form className='border-2 p-4 md:w-3/5 min-[320px]:w-11/12 md:h-56 h-fit bg-white rounded-xl flex flex-col justify-start items-start  overflow-auto' onClick={(e) => e.stopPropagation()}>
                    <div className='flex min-[320px]:flex-col md:flex-row min-[320px]:justify-center md:justify-between items-center w-full p-4 gap-4'>
                        <fieldset className='border-2 border-blue-500 min-[320px]:w-full md:w-1/2 pl-4'>
                            <legend htmlFor="coupon" className='text-xl text-blue-500 font-semibold'>Coupon Code</legend>
                            <input type="text" className='h-10 px-4 w-full border-none outline-none' name='coupon' placeholder='Enter coupon code' value={code} onChange={(e) => setCouponCode(e.target.value)} />
                        </fieldset>
                        <fieldset className='border-2 border-blue-500 min-[320px]:w-full md:w-1/2 pl-4'>
                            <legend htmlFor="discount" className='text-xl text-blue-500 font-semibold'>Discount</legend>
                            <input className='h-10 px-4 w-full border-none outline-none' type='number' name='discount' placeholder='Enter Dicount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </fieldset>
                    </div>
                    <button className="m-auto md:w-1/2 min-[320px]:w-11/12 transition-all  border-2 border-blue-500 rounded-md py-2 px-4 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed" onClick={(e) => createCoupon(e)}>Create Coupon</button>

                </form>
            </PopUp>
            }


        </Layout>
    )
}

export default Discount