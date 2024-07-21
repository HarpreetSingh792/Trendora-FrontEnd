import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductById, useFilterProductsQuery, useLatestProductQuery } from '../redux/api/productApi';
import { addToWishlist } from '../redux/reducers/cartReducer';
import { CiSquarePlus } from "react-icons/ci";
import { BsCart3 } from "react-icons/bs";
import { BiPurchaseTag } from "react-icons/bi";
import ProductCatalog from "../components/ProductCatalog"
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addItem } from '../redux/reducers/cartReducer';


const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const { data: RelatedCategoryProduct, isLoading: RelatedProductsLoading } = useFilterProductsQuery({ category: data?.category });
    const { data: LatestProducts, isLoading: LatestProductsLoading } = useLatestProductQuery();
    const latestPD = LatestProducts?.products.filter(latestPd => latestPd._id !== id)
    const dispatch = useDispatch();

    console.log(data)
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        const fetchProducts = () => {
            Promise.resolve(getProductById(id)).then((res) => setData(res?.data.product)).catch(() => navigate("*"));
        }
        setRelatedProducts(RelatedCategoryProduct?.products.filter(pd => pd._id !== id))
        fetchProducts();
    }, [id, setData, RelatedCategoryProduct])

    const addToCartHandler = (e, data) => {
        e.stopPropagation();
        dispatch(addItem(data))
        toast.success("Added To Cart")
    }




    return (
        <>
            <div className='w-full flex md:justify-evenly min-[320px]:justify-start items-start min-[320px]:gap-8 md:gap-1 p-4'>
                <div className='mt-2 w-1/2 ml-2 rounded-sm lg:w-96 md:w-72 sm:w-60  min-[320px]:w-44  drop-shadow-lg flex items-center justify-center' >
                    <img className="w-80 mix-blend-multiply " src={`${import.meta.env.VITE_SERVER}/${data?.photo}`} alt={`${data?.name.substring(0, 15)}-photo`} />
                </div>

                {/* Product Details..... */}

                <div className='border-1 w-1/2'>

                    <h4 className='font-bold min-[320px]:text-xs sm:text-sm md:text-lg lg:text-xl'>{data?.name}</h4>

                    {/* Tags........ */}

                    <div className='mt-2 flex flex-wrap items-center justify-start md:gap-4 min-[320px]:gap-2 '>
                        <p className='h-7 flex justify-center items-center font-semibold rounded-md p-2 bg-blue-500/20 text-blue-800  min-[320px]:text-xs'>{data?.category}</p>
                        {data?.stocks >= 1 && <p className='h-7 flex justify-center items-center font-semibold rounded-md p-2 bg-green-500/40 text-green-800 min-[320px]:text-xs'>Available</p>}
                        {data?.stocks <= 0 && <p className='h-7 flex justify-center items-center font-semibold rounded-md p-2 bg-red-500/40 text-red-800 min-[320px]:text-xs'>Out of Stock</p>}
                    </div>

                    <p className='mt-4 mb-4 font-bold italic  text-green-600/80 text-2xl'><span className='font-medium text-xl'>Price: </span>₹{data?.price}</p>

                    {/* Description and Payment feature for Large and Medium Devices..... */}

                    <div className='md:block min-[320px]:hidden'>
                        <p className='text-justify '><b className='text-xl font-semibold underline'>Description:</b> <br />{data?.description}</p>
                        <div className='w-full mt-4 flex flex-wrap justify-start items-center gap-8'>
                            <button className='flex  items-center justify-evenly gap-1 h-9 rounded-sm border-2 border-gray-500 p-1 text-xs font-bold cursor-pointer transition-all hover:bg-neutral-800 hover:border-neutral-800 hover:text-white' onClick={(e)=>addToCartHandler(e,data)}>Add to cart  <span className='text-lg font-black'><BsCart3 /></span></button>
                            <button className='flex  items-center justify-evenly gap-1 h-9 rounded-sm border-2 border-gray-500 p-1 text-xs font-bold cursor-pointer transition-all hover:bg-neutral-800 hover:border-neutral-800 hover:text-white' onClick={(e)=>{addToCartHandler(e,data);navigate("/cart")}}>Buy Now  <span className='text-xl font-black'><BiPurchaseTag /></span></button>
                            <button className='flex  items-center justify-evenly gap-1 h-9 rounded-sm border-2 border-gray-500 p-1 text-xs font-bold cursor-pointer transition-all hover:bg-neutral-800 hover:border-neutral-800 hover:text-white' onClick={()=>{
                                dispatch(addToWishlist(data))
                                toast.success("Added to wishlist")
                                }}>Add to wishlist <span className='text-xl font-black'><CiSquarePlus /></span></button>
                        </div>

                        <img className="mt-8 w-1/2" src={"../../public/payments.png"} alt="payment-gateway-banner" />
                    </div>
                </div>
            </div>

            {/* Description and Payment feature for Large and Medium Devices..... */}

            <div className='md:hidden min-[320px]:block p-4 -mt-4'>
                <p className='text-justify '><b className='text-xl font-semibold underline'>Description:</b> <br />{data?.description}</p>
                <div className='w-full mt-4 flex flex-wrap justify-start items-center gap-8'>
                    <button className='flex  items-center justify-evenly gap-1 w-40 h-9 rounded-sm border-2 border-gray-500 p-1 text-xs font-bold cursor-pointer transition-all hover:bg-neutral-800 hover:border-neutral-800 hover:text-white' onClick={(e)=>addToCartHandler(e,data)}>Add to cart  <span className='text-lg font-black'><BsCart3 /></span></button>
                    <button className='flex  items-center justify-evenly gap-1 w-40 h-9 rounded-sm border-2 border-gray-500 p-1 text-xs font-bold cursor-pointer transition-all hover:bg-neutral-800 hover:border-neutral-800 hover:text-white'onClick={(e)=>{addToCartHandler(e,data);navigate("/cart")}} >Buy Now  <span className='text-xl font-black'><BiPurchaseTag /></span></button>
                    <button className='flex  items-center justify-evenly gap-1 w-40 h-9 rounded-sm border-2 border-gray-500 p-1 text-xs font-bold cursor-pointer transition-all hover:bg-neutral-800 hover:border-neutral-800 hover:text-white' onClick={()=>{
                                dispatch(addToWishlist(data))
                                toast.success("Added to wishlist")
                                }}>Add to wishlist <span className='text-xl font-black'><CiSquarePlus /></span></button>
                </div>

                <img className="mt-8 w-4/5" src={"../../public/payments.png"} alt="payment-gateway-banner" />
            </div>

            {
                // List of all Related Products..... 

                relatedProducts?.length >= 1 && <div className='mt-4 border-t-2 p-4 w-full'>
                    <h2 className='ml-4 text-2xl font-semibold'>Relative Products</h2>
                    <div className='flex justify-start items-center gap-4  overflow-x-auto'>
                        <ProductCatalog isLoading={RelatedProductsLoading} data={relatedProducts} />
                    </div>

                </div>
            }

            {/* List of all Latest Products.....  */}

            <div className='mt-4 border-t-2 p-4 w-full'>
                <h2 className='ml-4 text-2xl font-semibold'>Latest Products</h2>
                <div className='flex justify-evenly items-center gap-8  overflow-x-auto'>
                    <ProductCatalog isLoading={LatestProductsLoading} data={latestPD} />
                </div>
            </div>
        </>
    )
}

export default Product