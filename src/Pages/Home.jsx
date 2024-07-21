import React from 'react'
import ProductCatalog from '../components/ProductCatalog'
import { useLatestProductQuery } from '../redux/api/productApi';
import toast from 'react-hot-toast';
import { Slider } from '../components/Slider';


const Home = () => {

  const { data, isLoading, isError } = useLatestProductQuery();
  if (isError) toast.error("Something went wrong ☹️")
  return (
    <>
      <Slider images={["/banner.png","/banner1.png","/banner2.png"]} />
      <section className='mt-2'>
        <div className={`border-2 grid grid-cols-auto-fit place-items-center gap-5 min-[320px]:p-0 sm:p-4`} >
          <ProductCatalog isLoading={isLoading} data={data?.products} />
        </div>
      </section>
    </>
  )
}

export default Home