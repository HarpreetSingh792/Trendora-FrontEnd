import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { FaCheckCircle } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { addItem, discount, removeItem } from '../redux/reducers/cartReducer';
import { server } from '../redux/store';
import "../styles/main1.scss";
import { CartCard } from '../components/CartCard';

const Cart = () => {

  const [coupon, setCoupon] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartReducer = useSelector(state => state.cartReducer);

  const addItemToCart = (_id) => {
    dispatch(addItem({ _id }))
  }

  const removeItemFromCart = (_id, price) => {
    if (cartReducer?.subtotal - price < 4999) {
      setCoupon("")
    }
    dispatch(removeItem({ _id }));
  }

  useEffect(() => {

    const debounce = setTimeout(() => {
      axios.get(`${server}/api/v1/discount/apply?coupon=${coupon}`).then((res) => dispatch(discount({ amount: res?.data?.amount }))).then((res) => setDiscountAmount(res?.payload.amount)).catch((err) => console.log(err))
    }, 500)

    return () => {
      clearTimeout(debounce)
    }
  }, [coupon])


  if (!cartReducer.orderItems.length) return <div className='flex flex-col items-center gap-4'> <div className='flex mt-12 justify-center text-4xl m-auto gap-4 items-center font-bold'>
    Cart is Empty <GiShoppingCart />
  </div>
    <button onClick={() => navigate("/")} className="md:w-1/5 min-[320px]:w-11/12 transition-all  border-2 border-black rounded-md py-2 px-4 text-black cursor-pointer hover:bg-black hover:text-white disabled:opacity-25 disabled:cursor-not-allowed" >Start Shopping</button>
  </div>
  return (
    <div className='md:flex min-[320px]:grid md:gap-0 min-[320px]:gap-4 border-2 md:h-[calc(100vh-3rem)]  p-4'>
      <div className='min-[320px]:order-last md:order-first min-[320px]:border-2 md:shadow-none md:w-3/4  min-[320px]:w-full  flex flex-col items-center overflow-auto p-8 '>
        {
          cartReducer?.orderItems.map(cart => (
            <CartCard key={cart?._id} _id={cart?._id} photo={cart.photos[0].url} name={cart?.name} quantity={cart?.quantity} description={cart?.description} stocks={cart?.stocks} price={cart?.price} addItemToCart={addItemToCart} removeItemFromCart={removeItemFromCart} />
          ))
        }
      </div>
      <form className='min-[320px]:order-first md:order-last min-[320px]:w-full md:w-1/4 md:h-3/4 min-[320px]:h-96 border-2 rounded-sm p-4 grid place-items-start' onSubmit={(e) => { e.preventDefault(); navigate("/shipping") }}>
        <div>
          <div className={`w-full flex justify-start items-center `}>
            <progress value={cartReducer?.subtotal} max={499} style={{ "--color": "lightgreen", "--height": "16px" }} className={`w-full`} /> ₹499
          </div>
          <p className='text-md font-medium mt-2'>{cartReducer?.subtotal >= 499 ?
            <span className='flex text-green-600 justify-start items- gap-2'><FaCheckCircle /> Your order is eligible for FREE Delivery.</span> :
            <span>
              Add items worth <span className='text-red-700'>₹{499 - cartReducer?.subtotal}</span> for <span className='text-green-600 '>FREE Delivery</span>
            </span>}</p>
        </div>
        <p className='font-semibold text-gray-700'>Subtotal: <span className='italic text-black font-semibold'>₹{cartReducer?.subtotal}</span></p>
        <p className='font-semibold text-gray-700'>Shipping Charges: <span className='italic text-black font-semibold'>₹{cartReducer?.shippingCharges}</span></p>
        <p className='font-semibold text-gray-700'>Tax: <span className='italic text-black font-semibold'>₹{cartReducer?.tax}</span></p>
        <p className='font-semibold text-gray-700'>Discount: <span className='italic text-red-700 font-semibold'>-₹{cartReducer?.discount}</span></p>
        <p className='font-bold text-gray-700'>Total: <span className='italic text-black font-bold'>₹{cartReducer?.total}</span></p>
        {
          cartReducer?.subtotal > 5000 && <input type='text' placeholder='Coupon Code' value={coupon} onChange={(e) => setCoupon(e.target.value)} className='border-2 w-full pl-2' />
        }


        {coupon.length > 0 && cartReducer.subtotal > 5000 && (
          discountAmount > 0 ? <p className='-mt-2 m-auto text-green-600 flex justify-center items-center gap-2'><FaCheckCircle /> Coupon Code Applied!!</p> : <p className='-mt-2 m-auto text-red-700 flex justify-center items-center gap-2'><RxCrossCircled /> Invalid Coupon Code</p>)}

        <input type='submit' value="Proceed to Buy" className='border-2 w-full rounded-md border-blue-400 text-blue-400 cursor-pointer transition-all ease-in-out hover:text-white hover:bg-blue-400' />
      </form>
    </div>
  )
}

export default Cart



