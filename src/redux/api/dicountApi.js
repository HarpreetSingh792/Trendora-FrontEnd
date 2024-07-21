import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../store";

export const discountApi = createApi({
  reducerPath: "discount-Api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/discount/`,
  }),
  tagTypes: ["discount"],
  endpoints: (builder) => ({
    allDiscountCoupons: builder.query({
      query: (adminId) => `all-coupon?id=${adminId}`,
      providesTags: ["discount"],
    }),

    createDiscountCoupon: builder.mutation({
      query: ({adminId, data}) => ({
        url: `new/?id=${adminId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["discount"],
    }),
    deleteCoupon: builder.mutation({
      query: ({couponId, adminId}) => ({
        url: `coupon/${couponId}?id=${adminId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["discount"],
    }),
  }),
});

export const { useAllDiscountCouponsQuery,useCreateDiscountCouponMutation,useDeleteCouponMutation } = discountApi;
