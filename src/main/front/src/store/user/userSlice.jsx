import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 30 },
  reducers: {
    changeName(state) {
      state.name = "park";
    },
  },
});

export let { changeName } = user.actions;

export default user;
