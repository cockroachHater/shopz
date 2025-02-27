import { createSlice } from "@reduxjs/toolkit";

const product = createSlice({
  name: "product",
  initialState: 0,
  reducers: {
    plus(state) {
      return state + 1;
    },
    minus(state) {
      return state - 1;
    },
    reset(state) {
      return 0;
    },
  },
});

export let { plus, minus, reset } = product.actions;
export default product;
