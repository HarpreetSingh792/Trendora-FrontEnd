import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const dashBoardApi = createApi({
    reducerPath:"dashboard-Api",
    baseQuery:fetchBaseQuery({
        baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/dashboard/`
    }),
    endpoints:(builder)=>({
        homeStats:builder.query({
            query:(userId)=>`home-stats?id=${userId}`,
            keepUnusedDataFor:0
        }),
        lineStats:builder.query({
            query:(userId)=>`home-line?id=${userId}`,
            keepUnusedDataFor:0
        }),
        barStats:builder.query({
            query:(userId)=>`home-bar?id=${userId}`,
            keepUnusedDataFor:0
        }),
        pieStats:builder.query({
            query:(userId)=>`home-pie?id=${userId}`,
            keepUnusedDataFor:0
        })
    })
})



export const {useHomeStatsQuery,useLineStatsQuery,useBarStatsQuery,usePieStatsQuery} = dashBoardApi;