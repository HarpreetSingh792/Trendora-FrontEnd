import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiPurchaseTag } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { CiSquarePlus } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCatalog from "../components/ProductCatalog";
import ReviewCard from '../components/ReviewCard';
import { getProductById, useAdd_updateReviewMutation, useFilterProductsQuery, useGetAllReviewsQuery, useLatestProductQuery } from '../redux/api/productApi';
import { addItem, addToWishlist } from '../redux/reducers/cartReducer';


const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const { data: RelatedCategoryProduct, isLoading: RelatedProductsLoading } = useFilterProductsQuery({ category: data?.category });
    const { data: LatestProducts, isLoading: LatestProductsLoading } = useLatestProductQuery();
    const latestPD = LatestProducts?.products.filter(latestPd => latestPd._id !== id)
    const [currentPhoto, setCurrentPhoto] = useState(data?.photos[0].url);

    // get all Reviews...
    const { data: productReview, isLoading: productReviewLoading } = useGetAllReviewsQuery(id);

    // Add new review...
    const [addComment, setAddComment] = useState("");
    const [addRatings, setAddRatings] = useState(1);

    const [addReview] = useAdd_updateReviewMutation();

    const { _id: userId } = useSelector(state => state?.userReducer?.user ?? "")

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        const fetchProducts = () => {
            Promise.resolve(getProductById(id)).then((res) => setData(res?.data.product)).catch(() => navigate("*"));
        }
        setRelatedProducts(RelatedCategoryProduct?.products.filter(pd => pd._id !== id))
        fetchProducts();
    }, [id, setData, RelatedCategoryProduct])

    useEffect(() => {
        if (data) setCurrentPhoto(data?.photos[0].url)
    }, [data])

    const addToCartHandler = (e, data) => {
        e.stopPropagation();
        dispatch(addItem(data))
        toast.success("Added To Cart")
    }




    return (
        <>
            <div className='w-full flex md:justify-evenly min-[320px]:justify-start items-start min-[320px]:gap-8 md:gap-4 p-4'>
                <div className='min-[320px]:w-3/5 min-[320px]:h-64 md:h-full md:w-2/5 flex min-[320px]:flex-row-reverse md:flex-col justify-center items-center min-[320px]:gap-0 md:gap-4'>

                    <div className='mt-2  ml-2 rounded-sm lg:w-96 md:w-72 sm:w-60  min-[320px]:w-96  drop-shadow-lg flex items-center justify-center' >
                        <img className="min-[320px]:w-56 md:w-80 md:h-80 min-[320px]:h-56 mix-blend-multiply " src={currentPhoto} alt={`${data?.name.substring(0, 15)}-photo`} loading='lazy' />
                    </div>
                    <div className='h-full flex md:flex-row min-[320px]:flex-col w-full justify-between items-center md:p-4 md:flex-wrap gap-2'>
                        {
                            data?.photos.map(item => <img key={item.url} className='md:w-20 md:h-20 min-[320px]:w-12 min-[320px]:gap-2 border-2 cursor-pointer' src={`${item.url}`} alt={`${item.url}`} onClick={() => setCurrentPhoto(item.url)} />)
                        }
                    </div>
                </div>
                {/* Product Details..... */}

                <div className='min-[320px]:w-1/2 md:w-3/5'>

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
                            <button className='flex  items-center justify-evenly gap-1 h-9 rounded-sm border-2 border-gray-500 p-1 text-xs font-bold cursor-pointer transition-all hover:bg-neutral-800 hover:border-neutral-800 hover:text-white' onClick={(e) => addToCartHandler(e, data)}>Add to cart  <span className='text-lg font-black'><BsCart3 /></span></button>
                            <button className='flex  items-center justify-evenly gap-1 h-9 rounded-sm border-2 border-gray-500 p-1 text-xs font-bold cursor-pointer transition-all hover:bg-neutral-800 hover:border-neutral-800 hover:text-white' onClick={(e) => { addToCartHandler(e, data); navigate("/cart") }}>Buy Now  <span className='text-xl font-black'><BiPurchaseTag /></span></button>
                            <button className='flex  items-center justify-evenly gap-1 h-9 rounded-sm border-2 border-gray-500 p-1 text-xs font-bold cursor-pointer transition-all hover:bg-neutral-800 hover:border-neutral-800 hover:text-white' onClick={() => {
                                dispatch(addToWishlist(data))
                                toast.success("Added to wishlist")
                            }}>Add to wishlist <span className='text-xl font-black'><CiSquarePlus /></span></button>
                        </div>

                        <img className="mt-8 w-1/2" src={"https://res.cloudinary.com/dzyvt5lii/image/upload/v1721914515/payments_fvlmwp.png"} alt="payment-gateway-banner" />
                    </div>
                </div>
            </div>

            {/* Description and Payment feature for Large and Medium Devices..... */}

            <div className='md:hidden min-[320px]:block p-4 mt-4'>
                <p className='text-justify '><b className='text-xl font-semibold underline'>Description:</b> <br />{data?.description}</p>
                <div className='w-full mt-4 flex flex-wrap justify-start items-center gap-8'>
                    <button className='flex  items-center justify-evenly gap-1 w-40 h-9 rounded-sm border-2 border-gray-500 p-1 text-xs font-bold cursor-pointer transition-all hover:bg-neutral-800 hover:border-neutral-800 hover:text-white' onClick={(e) => addToCartHandler(e, data)}>Add to cart  <span className='text-lg font-black'><BsCart3 /></span></button>
                    <button className='flex  items-center justify-evenly gap-1 w-40 h-9 rounded-sm border-2 border-gray-500 p-1 text-xs font-bold cursor-pointer transition-all hover:bg-neutral-800 hover:border-neutral-800 hover:text-white' onClick={(e) => { addToCartHandler(e, data); navigate("/cart") }} >Buy Now  <span className='text-xl font-black'><BiPurchaseTag /></span></button>
                    <button className='flex  items-center justify-evenly gap-1 w-40 h-9 rounded-sm border-2 border-gray-500 p-1 text-xs font-bold cursor-pointer transition-all hover:bg-neutral-800 hover:border-neutral-800 hover:text-white' onClick={() => {
                        dispatch(addToWishlist(data))
                        toast.success("Added to wishlist")
                    }}>Add to wishlist <span className='text-xl font-black'><CiSquarePlus /></span></button>
                </div>

                <img className="mt-8 w-4/5" src={"https://res.cloudinary.com/dzyvt5lii/image/upload/v1721914515/payments_fvlmwp.png"} alt="payment-gateway-banner" />
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

            {!productReviewLoading && <div className='mt-4 border-2 flex flex-col gap-4 w-full p-4'>
                {productReview.review?.map(review => <ReviewCard key={review._id} pdId={review.product} reviewId={review._id} name={review.user.name} photo={review.user.photo} comment={review.comments} rating={review.ratings} userId={review.user._id} />)}
            </div>}




            {
                userId && <div className='w-full mt-8'>
                    <form className='border-2 p-4  h-fit bg-white  flex flex-col justify-start items-start  overflow-auto' onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault()
                    }
                    }>
                        <div className='flex flex-col  min-[320px]:justify-center md:justify-between items-center w-full p-4 gap-4'>
                            <fieldset className='border-2 border-gray-700 w-full pl-4'>
                                <legend htmlFor="comment" className='text-xl text-gray-700 font-semibold'>Comment</legend>

                                <textarea name='comment' rows={5} maxLength={200} placeholder={"Commment: "} value={addComment} className='outline-none border-none w-full px-4 py-2 text-pretty break-words' onChange={(e) => setAddComment(e.target.value)} />
                            </fieldset>
                            <fieldset className='border-2 border-gray-700 w-full pl-4'>
                                <legend htmlFor="ratings" className='text-xl text-gray-700 font-semibold'>Ratings </legend>
                                <input className='h-10 px-4 w-full border-none outline-none' min={1} max={5} type='number' name='ratings' value={addRatings} onChange={(e) => setAddRatings(e.target.value)} />
                            </fieldset>
                        </div>
                        <button className="m-auto  min-[320px]:w-11/12 md:w-1/5 transition-all  border-2 border-black rounded-md py-2 px-4 text-black cursor-pointer hover:bg-black hover:text-white disabled:opacity-25 disabled:cursor-not-allowed" onClick={(e) => {
                            addReview({
                                pdId: id,
                                userId,
                                data: {
                                    comments: addComment,
                                    ratings: addRatings,
                                }
                            })
                            toast.success("Review Added")
                        }}>Add</button>

                    </form>
                </div>
            }
        </>
    )
}

export default Product