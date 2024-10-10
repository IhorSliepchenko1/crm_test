import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AppRouter from "../../http/routes";
import { headers } from "../../utils/headers";

export const fetchRegister = createAsyncThunk(
     "register/fetchRegister",
     async (data, { rejectWithValue }) => {
          try {
               const response = await axios.post(AppRouter.registration, data, headers);

               return response.data;
          } catch (error) {
               return rejectWithValue(
                    error.response ? error.response.data : error.message
               );
          }
     }
);

export const registerSlice = createSlice({
     name: "register",
     initialState: {
          status: "idle",
          error: null,
     },

     reducers: {},

     extraReducers: (builder) => {
          builder

               .addCase(fetchRegister.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
               })

               .addCase(fetchRegister.fulfilled, (state) => {
                    state.status = "succeeded";
               })

               .addCase(fetchRegister.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload;
               });
     },
});
