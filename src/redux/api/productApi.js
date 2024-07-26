import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
    tagType: ["product"],
  }),
  endpoints: (builder) => ({
    categories: builder.query({
      query: () => "category",
      providesTags: ["product"],
    }),
    latestProduct: builder.query({
      query: () => "latest",
      providesTags: ["product"],
    }),
    allProducts: builder.query({
      query: () => `all/`,
      providesTags: ["product"],
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
      providesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: ({ formData, id, userId }) => ({
        url: `${id}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    newProduct: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/new/?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: ({ id, userId }) => ({
        url: `${id}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),

    // Reviews Api
    add_updateReview: builder.mutation({
      query: ({ pdId, userId, data }) => ({
        url: `review/new/${pdId}?id=${userId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `review/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),

    getAllReviews: builder.query({
      query: (pdId) => `reviews/${pdId}`,
      providesTags: ["product"],
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

  // Reviews....
  useAdd_updateReviewMutation,
  useDeleteReviewMutation,
  useGetAllReviewsQuery
} = productApi;
