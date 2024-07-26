import React, {useState } from 'react'
import { IoMdTrash } from "react-icons/io";
import { useDeleteProductMutation, useUpdateProductMutation } from '../../redux/api/productApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {useNavigate } from 'react-router-dom';
const ProductForm = ({ id, name: pdName, price: pdPrice, stocks: pdStocks, category: pdCategory }) => {
  const [name, setName] = useState(pdName ? pdName : "")
  const [price, setPrice] = useState(pdPrice ? pdPrice : "");
  const [stocks, setStocks] = useState(pdStocks ? pdStocks : "");
  const [category, setCategory] = useState(pdCategory ? pdCategory : "");
  const [file, setFile] = useState([])
  const [imgPrev, setImgPrev] = useState("")
  const [uploading, setIsUploading] = useState(false)

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.userReducer);

  const changeHandler = (setState, e) => {
    setState(e.target.value);
  }

  const [updatePd] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const formData = new FormData();

  const submitHandler = async (e) => {

    try {
      e.preventDefault()
      setIsUploading(true)
      if (name) formData.set("name", name);
      if (price) formData.set("price", price);
      if (stocks) formData.set("stocks", stocks);
      if (category) formData.set("category", category);
      if (file && file.length > 0) {
        file.reverse().forEach((file) => {
          formData.append("photo", file);
        });
      }
      const res = await updatePd({ formData, id, userId: user?._id })
      if ("data" in res) {
        toast.success(res.data.message)
        setIsUploading(false)
        navigate(`/admin/products`)
      } else {
        toast.error(res.error.data.message)
      }
    } catch (error) {
      setIsUploading(false)
      console.log(error)
    }
  }
  const deleteProductHandler = async (e) => {
    e.preventDefault();
    const res = await deleteProduct({ id: id, userId: user?._id })
    if ("data" in res) {
      toast.success(res.data.message)
      navigate("/admin/products")
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
        <legend htmlFor='photos' >Photos</legend>
        <input type='file' id='photos' className='h-8 w-full border-none outline-none' multiple onChange={(e) => {
          const prevImg = [];
          for (let i = 0; i < Object.keys(e.target.files).length; i++) {
            const url = URL.createObjectURL(e.target.files[i])
            prevImg.push(url);
          }
          console.log(e.target.files)
          setFile(Object.values(e.target.files))
          setImgPrev(prevImg);
        }} />
      </fieldset>
      {imgPrev && <div className='flex justify-between overflow-auto items-center w-full p-4'>
        {
          imgPrev.map(img => <img key={img} src={img} width={50} className='border-2' />)
        }
      </div>}
      <input type='submit' value={uploading?"Updating...":"Update"} disabled={uploading} className="md:w-1/2 min-[320px]:w-11/12 transition-all  border-2 border-blue-500 rounded-md py-2 px-4 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed" />
    </form>
  )
}

export default ProductForm