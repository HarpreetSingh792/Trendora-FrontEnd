import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import DisplayProduct from '../components/DisplayProduct';
import ProductForm from '../components/ProductForm';
import { getProductById } from '../../redux/api/productApi';

const ManageProd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [prod, setProd] = useState({});

  const [img, setImg] = useState("");

  useEffect(() => {
    return () => {
      Promise.resolve(getProductById(id)).then((res) => setProd(res?.data?.product)).catch((err) => navigate("*"));
    }
  }, [])

  useEffect(() => {
    if (Object.keys(prod).length> 0) {
      setImg(prod.photos[0].url)
    }
  }, [prod])
  return (
    <Layout>
      <div className='mt-6 md:h-[34rem] w-4/5 m-auto min-[320px]:grid md:flex md:justify-start md:items-center md:gap-4 min-[320px]:gap-8 mb-2'>
        <DisplayProduct id={id} name={prod.name} price={prod.price} imgSrc={img} inStock={prod.stocks} />
        < ProductForm id={id} name={prod.name} price={prod.price} stocks={prod.stocks} category={prod.category} file={prod.photos} />
      </div>
    </Layout>
  )
}

export default ManageProd;