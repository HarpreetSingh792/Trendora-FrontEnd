import React, { useEffect, useState } from 'react'
import { IoMdTrash } from "react-icons/io";
import { useDeleteProductMutation, useUpdateProductMutation } from '../../redux/api/productApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
const ProductForm = ({ id, name: pdName, price: pdPrice, stocks: pdStocks, category: pdCategory, file: pdFile }) => {
  const [name, setName] = useState(pdName ? pdName : "")
  const [price, setPrice] = useState(pdPrice ? pdPrice : "");
  const [stocks, setStocks] = useState(pdStocks ? pdStocks : "");
  const [category, setCategory] = useState(pdCategory ? pdCategory : "");
  const [file, setFile] = useState("")
  const [imgPrev,setImgPrev] =useState("")

  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.userReducer);

  const changeHandler = (setState, e) => {
    setState(e.target.value);
  }

  const [updatePd] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const formData = new FormData();

  const submitHandler = async (e) => {
    e.preventDefault()
    if (name) formData.set("name", name);
    if (price) formData.set("price", price);
    if (stocks) formData.set("stocks", stocks);
    if (category) formData.set("category", category);
    if (file) formData.set("photo", file);
    const res = await updatePd({ formData, id, userId: user?._id })
    if ("data" in res) {
      toast.success(res.data.message)
      navigate(location.pathname.replace(`${location.pathname}`, location.pathname.substring(0, 15)));
    } else {
      toast.error(res.error.data.message)
    }
  }

  const deleteProductHandler = async (e) => {
    e.preventDefault();
    const res = await deleteProduct({ id: id, userId: user?._id })
    navigate(location.pathname.replace(`${location.pathname}`, location.pathname.substring(0, 15)));
    if ("data" in res) {
      toast.success(res.data.message)
      navigate(location.pathname.replace(`${location.pathname}`, location.pathname.substring(0, 15)));
    } else {
      toast.error(res.error.data.message)
    }
  }
  return (
    <form className='shadow-4xl min-[320px]:h-30rem md:h-full md:w-1/2 w-full grid place-items-center relative' onSubmit={submitHandler}>
      <button className='absolute bg-red-500/20 p-2 rounded-full text-red-500 text-xl -top-4 -right-4 z-50' onClick={(e) => deleteProductHandler(e)}><IoMdTrash /></button>
      <h3 className='font-bold text-2xl uppercase'>Manage</h3>
      <fieldset className='border-2 w-11/12 pl-2'>
        <legend htmlFor='name' >Name</legend>
        <input type='text' id='name' className='h-6 w-full border-none outline-none' placeholder={pdName} value={name} onChange={(e) => changeHandler(setName, e)} />
      </fieldset>
      <fieldset className='border-2 w-11/12 pl-2'>
        <legend htmlFor='price' >Price</legend>
        <input type='number' id='price' className='h-6 w-full border-none outline-none' placeholder={pdPrice} value={price} onChange={(e) => changeHandler(setPrice, e)} />
      </fieldset>
      <fieldset className='border-2 w-11/12 pl-2'>
        <legend htmlFor='stocks'>Stocks</legend>
        <input type='number' id='stocks' className='h-6 w-full border-none outline-none' placeholder={pdStocks} value={stocks} onChange={(e) => changeHandler(setStocks, e)} />
      </fieldset>
      <fieldset className='border-2 w-11/12 pl-2'>
        <legend htmlFor='category'>Category</legend>
        <input type='text' id='category' className='h-6 w-full border-none outline-none' placeholder={pdCategory} value={category} onChange={(e) => changeHandler(setCategory, e)} />
      </fieldset>
      <fieldset className='border-2 w-11/12 pl-2 py-2'>
        <legend htmlFor='photo' >Photo</legend>
        <input type='file' id='photo' className='h-8 w-full border-none outline-none' onChange={(e) => {
          const url = URL.createObjectURL(e.target.files[0])
          setFile(e.target.files?.[0])
          setImgPrev(url);
          }} />
      </fieldset>
      {imgPrev&&<img  src={imgPrev} width={50} className='border-2' />}
      <input type='submit' value="Update" className="md:w-1/2 min-[320px]:w-11/12 transition-all  border-2 border-blue-500 rounded-md py-2 px-4 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed" />
    </form>
  )
}

export default ProductForm