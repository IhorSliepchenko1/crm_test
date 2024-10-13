import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AppRouter from "../../http/routes";

export const fetchExpensesSlice = createAsyncThunk(
     "expenses/fetchExpensesSlice ",
     async (page, { rejectWithValue }) => {
          try {
               const response = await axios.get(AppRouter.expenses, {
                    headers: {
                         "Content-Type": "application/json",
                    },
                    params: {
                         page
                    },
               });


               return response.data.rows
          } catch (error) {
               return rejectWithValue(
                    error.response ? error.response.data : error.message
               );
          }
     }
);

export const expensesSlice = createSlice({
     name: "expenses",
     initialState: {
          data: [],
          status: "idle",
          error: null,
     },

     reducers: {},

     extraReducers: (builder) => {
          builder

               .addCase(fetchExpensesSlice.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
               })

               .addCase(fetchExpensesSlice.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.data = action.payload;

               })

               .addCase(fetchExpensesSlice.rejected, (state) => {
                    state.status = "failed";
               });
     },
});
