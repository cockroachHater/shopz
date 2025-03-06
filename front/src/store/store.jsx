import { configureStore, createSlice } from "@reduxjs/toolkit";

import count from "./testSlice";
import user from "./user/userSlice";
import product from "./product/productSlice";

export default configureStore({
  reducer: {
    count: count.reducer,
    user: user.reducer,
    product: product.reducer,
  },
});
