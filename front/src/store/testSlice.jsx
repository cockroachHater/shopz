import { createSlice } from "@reduxjs/toolkit";

const count = createSlice({
  name: "count",
  initialState: 0,
  reducers: {
    plus(state) {
      return state + 1;
    },
    minus(state) {
      return state - 1;
    },
    parameterplus(state, action) {
      return state + action.payload;
    },
  },
});

export let { plus, minus, parameterplus } = count.actions;

export default count;
