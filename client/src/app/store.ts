import { configureStore } from "@reduxjs/toolkit";
import { token } from "../features/login/loginSlice";

export const store = configureStore({
     reducer: {
          token: token
     },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;