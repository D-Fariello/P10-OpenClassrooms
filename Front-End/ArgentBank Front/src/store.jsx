import { configureStore } from "@reduxjs/toolkit";
import SingInReducer from "./features/SingInSlice";

export const store = configureStore({
  reducer: {
    user: SingInReducer,
  },
});
