import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout';
import { useLocation, useNavigate } from "react-router-dom"
import { useNewProductMutation } from '../../redux/api/productApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
const ProductNew = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [newProduct] = useNewProductMutation();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stocks, setStocks] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState([]);
    const [photoPrev, setPhotoPrev] = useState([]);
    const [disabled, isDisabled] = useState(false);
    const [adding, setIsAdding] = useState(false)

    const { user } = useSelector((state) => state.userReducer);

    useEffect(() => {
        setPhotoPrev([])
        photo?.map(item => {
            const fr = new FileReader();
            fr.readAsDataURL(item);
            fr.onloadend = () => {
                const url = fr.result;
                setPhotoPrev(prev => [...prev, url]);
            }
        })
    }, [photo])


    const changeHandler = (setState, e) => {
        setState(e.target.value);
    }

    const submitHandler = async (e) => {
        try {
            const formData = new FormData();
            e.preventDefault();
            isDisabled(true)
            setIsAdding(true)
            if (name) formData.set("name", name);
            if (price) formData.set("price", price);
            if (stocks) formData.set("stocks", stocks);
            if (category) formData.set("category", category);
            if (description) formData.set("description", description);
            if (photo && photo.length > 0) {
                photo.reverse().map(file => formData.append("photo", file))
            }
            const res = await newProduct({ id: user?._id, formData })
            if ("data" in res) {
                toast.success(res.data.message)
                setIsAdding(false)
                navigate("/admin/products");
            }
            else {
                toast.error(res.error.data.message)
            }
        } catch (error) {
            setIsAdding(false)
            console.log(error)
        }
    }

    useEffect(() => {
        const checkNullInputs = setInterval(() => {
            if (!name || !price || !stocks || !category || !photo || !description) {
                isDisabled(true)
            }
            else {
                isDisabled(false)
            }
        }, 1000)

        return () => {
            clearInterval(checkNullInputs);
        }
    }, [name, price, stocks, category, photo, description])
    return (
        <Layout>
            <div className='p-4'>
                <form className='md:w-3/5 min-[320px]:w-11/12 m-auto border-2 grid place-items-center py-4 gap-8' onSubmit={(e) => submitHandler(e)}>
                    <h2 className='text-blue-500 md:text-4xl min-[320px]:text-2xl font-semibold'>NEW PRODUCT</h2>
                    <div className='grid place-items-start gap-2 w-full px-4'>
                        <label htmlFor='name' className='cursor-pointer text-blue-500'>Name:</label>
                        <input type='text' id='name' placeholder='Name' className='w-full h-12  border-2 px-4' value={name} onChange={(e) => changeHandler(setName, e)} required />
                    </div>
                    <div className='grid place-items-start gap-2 w-full px-4'>
                        <label htmlFor='price' className='cursor-pointer text-blue-500'>Price</label>
                        <input type='number' id='price' placeholder='Price' className='w-full h-12  border-2 px-4' value={price} onChange={(e) => changeHandler(setPrice, e)} required />
                    </div>
                    <div className='grid place-items-start gap-2 w-full px-4'>
                        <label htmlFor='stock' className='cursor-pointer text-blue-500'>Stock</label>
                        <input type='number' id='stock' placeholder='Stock' className='w-full h-12  border-2 px-4' value={stocks} onChange={(e) => changeHandler(setStocks, e)} required />
                    </div>
                    <div className='grid place-items-start gap-2 w-full px-4'>
                        <label htmlFor='category' className='cursor-pointer text-blue-500'>Category</label>
                        <input type='text' id='category' placeholder='Category' className='w-full h-12  border-2 px-4' value={category} onChange={(e) => changeHandler(setCategory, e)} required />
                    </div>
                    <div className='grid place-items-start gap-2 w-full px-4'>
                        <label htmlFor='photo' className='cursor-pointer text-blue-500'>Photo</label>
                        <input type='file' id='photo' className='w-full h-12  border-2 px-4 py-2' onChange={(e) => setPhoto(Object.values(e.target.files))} required multiple />
                    </div>
                    <div className='grid place-items-start gap-2 w-full px-4'>
                        <label htmlFor='description' className='cursor-pointer text-blue-500'>Description</label>
                        <input type='text' id='description' placeholder='Description' className='w-full h-12  border-2 px-4' value={description} onChange={(e) => changeHandler(setDescription, e)} required />
                    </div>
                    <button className="md:w-1/2 min-[320px]:w-11/12 transition-all  border-2 border-blue-500 rounded-md py-2 px-4 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed" disabled={disabled}>{adding ? "Uploading" : "Create"}</button>
                    <div>
                        {
                            photoPrev && <div className='flex justify-between items-center w-full p-4 overflow-auto gap-4'>
                                {
                                    photoPrev?.map(img => <img key={img} src={img} width={50} height={50} className='border-2' />)
                                }
                            </div>
                        }
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default ProductNew; 