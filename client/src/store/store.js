import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "../features/user/loginSlice";


export const store = configureStore({
     reducer: {
          token: loginSlice.reducer
     },
});