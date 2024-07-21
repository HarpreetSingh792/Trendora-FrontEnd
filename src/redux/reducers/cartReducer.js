import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  discount: 0,
  tax: 0,
  subtotal: 0,
  shippingCharges:40 ,
  total: 0,
  orderItems: [],
  wishlistProducts: [],
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: 0,
  },
};

const calculateTotal = (state) => {
  // Shipping Charges.....
  if (state.subtotal > 499) {
    state.shippingCharges = 0;
  } else {
    state.shippingCharges = 40;
  }
  if (state.subtotal > 4999) {
    state.tax = (18 * state.subtotal) / 100;
  } else if (state.subtotal < 5000 && state.subtotal > 0) {
    state.tax = 0;
    state.discount = 0;
  }
  state.total = state.subtotal + state.tax + state.shippingCharges;
  state.total = parseFloat((state.total - state.discount).toFixed(2));
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addItem: (state, action) => {
      // Check whether the item exist by finding its index..............
      const idx = state.orderItems.findIndex(
        (val) => val._id === action.payload._id
      );

      //   if item already exists update quantity....
      if (idx !== -1) {
        state.orderItems[idx].quantity += 1;
        state.subtotal += state.orderItems[idx].price;
      } else {
        //push the item....
        state.orderItems.push({ quantity: 1, ...action.payload });
        state.subtotal += action.payload.price;
      }

      calculateTotal(state);
    },
    removeItem: (state, action) => {
      const idx = state.orderItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (idx !== -1) {
        if (state.orderItems[idx].quantity > 1) {
          state.orderItems[idx].quantity -= 1;
          state.subtotal -= state.orderItems[idx].price;
        } else {
          state.subtotal -= state.orderItems[idx].price;
          state.orderItems = state.orderItems.filter(
            (item) => item._id !== action.payload._id
          );
        }
      }

      calculateTotal(state);
    },
    discount: (state, action) => {
      state.discount = action.payload.amount;
      calculateTotal(state);
    },
    addShippingInfo: (state, action) => {
      state.shippingInfo = {
        address: action.payload.address,
        city: action.payload.city,
        state: action.payload.state,
        country: action.payload.country,
        pincode: action.payload.pincode,
      };
    },
    addToWishlist: (state, action) => {
      const idx = state.wishlistProducts.findIndex(
        (item) => item._id === action.payload._id
      );
      if (idx === -1) {
        state.wishlistProducts.push(action.payload);
      } 
    },
    removeFromWishlist: (state, action) => {
      state.wishlistProducts = state.wishlistProducts.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => ({
      ...initialState,
      wishlistProducts: state.wishlistProducts,
    }),
  },
});

export const {
  addItem,
  removeItem,
  discount,
  addShippingInfo,
  addToWishlist,
  removeFromWishlist,
  resetCart,
} = cartReducer.actions;
