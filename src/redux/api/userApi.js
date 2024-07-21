import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
      invalidatesTags:["users"]
    }),
    deleteUser: builder.mutation({
      query: ({ userId, adminId }) => ({
        url: `${userId}?id=${adminId}`,
        method: "DELETE",
      }),
      invalidatesTags:["users"]
    }),
    allUsers: builder.query({
      query: (id) => `all?id=${id}`,
      providesTags:["users"]
    }),
    singleUser: builder.query({
      query: (id) => `${id}`,
      providesTags:["users"]
    }),
  }),
});

export const getUser = async (id) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/user/${id}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const {
  useLoginMutation,
  useDeleteUserMutation,
  useAllUsersQuery,
  useSingleUserQuery,
} = userApi;
