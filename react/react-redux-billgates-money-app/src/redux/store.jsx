import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
  },
});
