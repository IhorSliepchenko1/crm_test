import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AppRouter from "../../http/routes";

export const fetchCashRegisterSlice = createAsyncThunk(
     "cashRegister/fetchCashRegisterSlice ",
     async ({ page }, { rejectWithValue }) => {
          try {
               const response = await axios.get(AppRouter.cashRegister, {
                    headers: {
                         "Content-Type": "application/json",
                    },
                    params: {
                         page,
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

export const cashRegisterSlice = createSlice({
     name: "cashRegister",
     initialState: {
          data: [],
          status: "idle",
          error: null,
     },

     reducers: {},

     extraReducers: (builder) => {
          builder

               .addCase(fetchCashRegisterSlice.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
               })

               .addCase(fetchCashRegisterSlice.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.data = action.payload;

               })

               .addCase(fetchCashRegisterSlice.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload;
               });
     },
});
