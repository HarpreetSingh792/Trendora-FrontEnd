import React, { useState } from 'react'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useCategoriesQuery, useFilterProductsQuery } from '../redux/api/productApi';
import toast from 'react-hot-toast';
import ProductCatalog from "../components/ProductCatalog"
import { useLocation } from 'react-router-dom';
import PopUp from '../components/PopUp';
const Search = () => {
  const [priceValue, setPriceValue] = useState(1000000);
  const [category, setCategory] = useState("");
  const [sortOpt, setSortOpt] = useState("");
  const [filterOpenForSmallDevice, setFilterOpenForSmallDevice] = useState(false);
  const { data, isLoading, isError, error } = useCategoriesQuery();
  const [page, setPage] = useState(1);
  const { state } = useLocation();
  const { data: searchData, isLoading: productLoading } = useFilterProductsQuery({ search: state, category, sort: sortOpt, price: priceValue, page });
  if (isError) toast.error(error.data.message);

  const pageHandler = (val) => {
    if (val >= 1) {
      if (page < searchData?.totalPage) setPage(prev => prev + 1);
    }
    else {
      if (page > 1) setPage(prev => prev - 1);
    }
  }

  return isLoading ? <h2>Loading</h2> : (
    <div className='md:flex md:justify-start min-[320px]:grid place-content-center relative'>
      <div className='border-2 p-4 w-1/5 grid place-content-start place-items-start h-[calc(100dvh-3rem)] overflow-auto min-[320px]:hidden md:block'>
        <section className='grid gap-4'>
          <h3 className='min-[320px]:p-4 md:p-0 text-2xl font-thin tracking-wider mb-4'>FILTERS</h3>
          <label htmlFor='sort' className='text-gray-700' >Sort</label>
          <select id='sort' value={sortOpt} onChange={(e) => setSortOpt(e.target.value)}>
            <option value={''}>None</option>
            <option value={'asc'}>Price (Low to High)</option>
            <option value={'desc'}>Price (High to Low)</option>
          </select>
        </section>
        <section className="mt-8 w-full grid gap-4">
          <p className='text-gray-700'>Max Price: {priceValue}</p>
          <input className="w-full" type='range' max={1000000} min={0} onChange={(e) => setPriceValue(e.target.value)} value={priceValue} />
        </section>
        <section className="mt-8 grid w-full gap-4">
          <label htmlFor="category" className='text-gray-700'>Categories</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value={""}>All</option>
            {
              data?.category.map((ele) => <option value={ele} key={ele}>{ele}</option>)
            }
          </select>
        </section>
      </div>

      {/* For small Devices */}

      <div className='mt-2 md:hidden min-[320px]:flex  w-full h-8 p-1 justify-end items-center'>
        <button className='font-thin tracking-wide text-right self-end flex items-center gap-2' onClick={(e) => {
          setFilterOpenForSmallDevice(true)
          e.stopPropagation();
        }}>FILTERS <span><MdOutlineKeyboardArrowDown /></span></button>
      </div>

      {filterOpenForSmallDevice && <div className='justify-end items-center flex'><PopUp setIsOpen={setFilterOpenForSmallDevice}>
        <div className='border-2 p-4 w-11/12 h-96 bg-white animate-pop-up translate-y-40 transition-all duration-500 rounded-xl flex flex-col justify-start items-start  overflow-auto' onClick={(e) => e.stopPropagation()}>
          <section className='grid gap-4 w-11/12'>
            <h3 className='text-2xl font-thin tracking-wider'>FILTERS</h3>
            <label htmlFor='sort' className='text-gray-700' >Sort</label>
            <select id='sort' value={sortOpt} onChange={(e) => {
              setSortOpt(e.target.value)
              setFilterOpenForSmallDevice(false)
            }}>
              <option value={''}>None</option>
              <option value={'asc'}>Price (Low to High)</option>
              <option value={'desc'}>Price (High to Low)</option>
            </select>
          </section>
          <section className="mt-4 w-11/12 grid gap-1">
            <p className='text-gray-700'>Max Price: {priceValue}</p>
            <input className="w-full" type='range' max={1000000} min={0} onChange={(e) => setPriceValue(e.target.value)} value={priceValue} />
          </section>
          <section className="mt-4 grid w-full gap-4">
            <label htmlFor="category" className='text-gray-700'>Categories</label>
            <select id="category" value={category} onChange={(e) => {
              setCategory(e.target.value)
              setFilterOpenForSmallDevice(false)
            }}>
              <option value={""}>All</option>
              {
                data?.category.map((ele) => <option value={ele} key={ele}>{ele}</option>)
              }
            </select>
          </section>
        </div>
      </PopUp>
      </div>
      }

<div className='md:w-4/5 min-[320px]:w-full p-4  h-[calc(100dvh-3rem)] overflow-auto'>
  <h3 className='md:p-0 text-4xl font-semibold tracking-wider mb-4'>Products</h3>
  <div className={`border-2 grid grid-cols-auto-fit place-items-center gap-4  min-[320px]:py-4`}>
    <ProductCatalog isLoading={productLoading} data={searchData?.products} />
  </div>

  {
    searchData?.totalPage > 1 &&
    <div className='border-2 flex p-2 justify-center items-center gap-4 mt-4 '>
      <button disabled={page === 1} onClick={() => pageHandler(-1)} className='flex  items-center justify-evenly gap-1 w-10 h-9 rounded-sm border-2 border-gray-500 p-1 text-xs font-bold cursor-pointer transition-all hover:bg-neutral-800 hover:border-neutral-800 hover:text-white'><MdOutlineKeyboardArrowLeft /></button>
      <p><span>{page}</span><span> out of </span><span> {searchData?.totalPage}</span></p>
      <button disabled={page === searchData?.totalPage} onClick={() => pageHandler(1)} className='flex  items-center justify-evenly gap-1 w-10 h-9 rounded-sm border-2 border-gray-500 p-1 text-xs font-bold cursor-pointer transition-all hover:bg-neutral-800 hover:border-neutral-800 hover:text-white'><MdOutlineKeyboardArrowRight /></button>
    </div>
  }
</div>
    </div >
  )
}

export default Search
