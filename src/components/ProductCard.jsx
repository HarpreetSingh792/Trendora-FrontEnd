import React, { useEffect, useState } from 'react';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../redux/reducers/cartReducer';
import { server } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const ProductCard = ({ ele ,addToCartHandler}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {wishlistProducts} = useSelector((state)=>state.cartReducer)

    const [toggleWishlist, setToggleWishlist] = useState(wishlistProducts.findIndex((item=>item._id===ele._id))!==-1?true:false||false)
    const [pd, setPD] = useState({});

    useEffect(() => {
        if (Object.keys(pd).length>0&&toggleWishlist) {
            dispatch(addToWishlist(pd))
        }
        else {
            dispatch(removeFromWishlist(pd._id));
        }

        setPD({})
    }, [toggleWishlist])
    return (
        <div onClick={() => navigate(`/pd/${ele._id}`)} className='h-96 cursor-pointer grid place-items-start gap-2 drop-shadow-4xl rounded-curve bg-white py-2 px-4 pb-4 relative'>
            <button onClick={(e) => { e.stopPropagation(); setToggleWishlist(prev => !prev); setPD(ele) }} className={`absolute top-4 right-3 bg-slate-200/100 rounded-full w-6 h-6 flex justify-center items-center text-sm font-extrabold`}>{toggleWishlist ? <FaHeart /> : <CiHeart />}</button>
            <img src={`${server}/${ele?.photo}`} alt={`${ele?.name}-img`} className="m-auto h-52 w-52 mix-blend-multiply bg-[#F2F2F2] " />
            <h3 className='w-60 text-xl font-black font-sans text-gray-700 text-start'>{ele.name.substring(0, 25)}{ele.name.length >= 50 ? "..." : ""}</h3>
            <p className='w-60 text-xs font-black font-sans text-gray-600 text-start'>{ele.description.substring(0, 85)}{ele.name.length >= 85 ? "..." : ""}</p>
            <section className='flex justify-between items-center w-full'>
                <h2 className='text-md font-bold font-sans text-black'>₹{ele.price}</h2>
                <button onClick={(e) => addToCartHandler(e, ele)} className='flex  items-center justify-center w-32 h-9 rounded-lg border-2 bg-gradient-to-r from-green-400 to-add-to-cart-seagreen p-1 text-xs font-bold'>Add to Cart <span> <IoIosArrowForward /></span> </button>
            </section>
        </div>
    )
}

export default ProductCard