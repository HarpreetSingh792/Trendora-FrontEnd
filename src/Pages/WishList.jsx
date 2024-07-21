import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import ProductCatalog from '../components/ProductCatalog';
import toast from 'react-hot-toast';

const WishList = () => {

    const navigate = useNavigate();
    const [isLoading,setIsLoading]=useState(true);
    const {wishlistProducts} = useSelector(state => state.cartReducer);

    useEffect(()=>{
        if(wishlistProducts?.length>=1){
            setIsLoading(false)
        }else{
            setIsLoading(true)
        }
    },[])

    if (!wishlistProducts?.length>=1) return <div className='h-[calc(100%-3rem)] w-full flex flex-col justify-center items-center gap-2'>
        <img className='m-auto min-[320px]:w-full min-[320px]:h-80 md:w-fit md:h-96' src="wishlist.jpg" alt="wishlist-jpg" />
        <button onClick={() => navigate("/")} className="md:w-1/5 min-[320px]:w-11/12 transition-all  border-2 border-blue-500 rounded-md py-2 px-4 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed" >Start Shopping</button>
    </div>
    return (
        <div className={`border-2 grid grid-cols-auto-fit place-items-center gap-5 min-[320px]:p-0 sm:p-4`} >
            {wishlistProducts?.length>=1 && <ProductCatalog isLoading={isLoading} data={wishlistProducts} />}
        </div>
    )
}

export default WishList