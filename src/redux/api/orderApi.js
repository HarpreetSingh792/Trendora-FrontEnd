import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "order-Api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
    tagType: ["order"],
  }),
  endpoints: (builder) => ({
    newOrder: builder.mutation({
      query: (data) => ({
        url: "new",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),

    processOrder: builder.mutation({
      query: ({orderId, userId}) => ({
        url: `${orderId}?id=${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["order"],
    }),

    deleterOrder: builder.mutation({
      query: ({orderId, userId}) => ({
        url: `${orderId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
    getAllOrders: builder.query({
      query: (userId) => `all?id=${userId}`,
      providesTags: ["order"],
    }),
    getSingleOrder: builder.query({
      query: (orderId) => orderId,
      providesTags: ["order"],
    }),
    getMyOrder: builder.query({
      query: (userId) => `my?id=${userId}`,
      providesTags: ["order"],
    }),
  }),
});

export const {
  useNewOrderMutation,
  useProcessOrderMutation,
  useDeleterOrderMutation,
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useGetMyOrderQuery,
} = orderApi;
