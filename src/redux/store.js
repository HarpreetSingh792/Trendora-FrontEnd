import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userReducer } from "./reducers/userReducer";
import { productApi } from "./api/productApi";
import { dashBoardApi } from "./api/dashboardApi";
import { cartReducer } from "./reducers/cartReducer";
import { orderApi } from "./api/orderApi";
import { discountApi } from "./api/dicountApi";

export const server =import.meta.env.VITE_SERVER;

export const store = configureStore({
    reducer:{
        [userApi.reducerPath]:userApi.reducer,
        [productApi.reducerPath]:productApi.reducer,
        [dashBoardApi.reducerPath]:dashBoardApi.reducer,
        [orderApi.reducerPath]:orderApi.reducer,
        [discountApi.reducerPath]:discountApi.reducer,
        [userReducer.name]:userReducer.reducer,
        [cartReducer.name]:cartReducer.reducer,
    },
    middleware:(mid)=>[...mid(),userApi.middleware,productApi.middleware,dashBoardApi.middleware,orderApi.middleware,discountApi.middleware]
});
