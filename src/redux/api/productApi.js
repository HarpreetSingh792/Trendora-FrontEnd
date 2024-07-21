import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  endpoints: (builder) => ({
    categories: builder.query({
      query: () => "category",
    }),
    latestProduct: builder.query({
      query: () => "latest",
    }),
    allProducts: builder.query({
      query: () => `all/`,
    }),
    filterProducts: builder.query({
      query: ({ search, category, sort, price, page }) => {
        let base = `filter?page=${page}`;
        if (category) base += `&category=${category}`;
        if (sort) base += `&sort=${sort}`;
        if (price) base += `&price=${price}`;
        if (search) base += `&search=${search}`;
        return base;
      },
    }),
    updateProduct: builder.mutation({
      query: ({ formData, id, userId }) => ({
        url: `${id}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
    }),
    newProduct: builder.mutation({
      query: ({ formData, id }) =>{
        return ({
          url: `/new/?id=${id}`,
          method: "POST",
          body:formData,
        })
        
      }
    }),
    deleteProduct: builder.mutation({
      query: ({ id, userId }) => ({
        url: `${id}?id=${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const getProductById = async (id) => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/product/${id}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const {
  useCategoriesQuery,
  useLatestProductQuery,
  useAllProductsQuery,
  useFilterProductsQuery,
  useNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
