import { createSlice } from "@reduxjs/toolkit";
import productsJSON from "../product.json";

const data = productsJSON.products;

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: data,
    budget: 100000000000,
    initialMoney: 100000000000,
  },
  reducers: {
    addToChart: (state, action) => {
      const { count, id } = action.payload;

      const product = state.items.find((product) => product.id === id);
      product.count = count;
      let price = 0;
      // eslint-disable-next-line array-callback-return
      state.items.map((product) => {
        price += Number(product.count) * Number(product.productPrice);
      });
      // İlk değerimizden harcanan miktarı çıkararak kalan bütçemizi bulduk.
      state.budget = Number(state.initialMoney) - Number(price); 
    },
  },
});

export const { addToChart } = productsSlice.actions;
export default productsSlice.reducer;
