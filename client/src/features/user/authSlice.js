import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AppRouter from "../../http/routes";

export const fetchAuth = createAsyncThunk(
     "auth/fetchAuth",
     async (token, { rejectWithValue }) => {
          try {
               const response = await axios.get(AppRouter.auth, {
                    headers: {
                         "Content-Type": "application/json",
                         "Autorization": token
                    },
               });

               return response.data
          } catch (error) {
               return rejectWithValue(
                    error.response ? error.response.data : error.message
               );
          }
     }
);

export const authSlice = createSlice({
     name: "auth",
     initialState: {
          user: null,
          status: "idle",
          error: null,
     },

     reducers: {},

     extraReducers: (builder) => {
          builder

               .addCase(fetchAuth.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
               })

               .addCase(fetchAuth.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.user = action.payload;
                    // localStorage.setItem("token", JSON.stringify(`Bearer ${action.payload}`));
               })

               .addCase(fetchAuth.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload;
               });
     },
});
