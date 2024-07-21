import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/reducers/cartReducer';
import ProductCard from './ProductCard';

const ProductCatalog = ({ isLoading, data }) => {
  const dispatch = useDispatch();
  
  

  const addToCartHandler = (e, data) => {
    e.stopPropagation();
    dispatch(addItem(data))
    toast.success("Added To Cart")
  }

 


  return (
    <>
      {
        !data?.length >= 1 ? <h2>Something went wrong ☹️</h2> : (

          isLoading ? <h2>Loading</h2> : data.map((ele) => {
            return <ProductCard key={ele._id} ele={ele} addToCartHandler={addToCartHandler} />
          })

        )
      }
    </>
  )
}

export default ProductCatalog