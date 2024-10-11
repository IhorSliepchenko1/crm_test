import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AppRouter from "../../http/routes";

export const fetchTypesSlice = createAsyncThunk(
     "types/fetchTypesSlice ",
     async (_, { rejectWithValue }) => {
          try {
               const response = await axios.get(AppRouter.typeExpenses, {
                    headers: {
                         "Content-Type": "application/json",
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

export const typesSlice = createSlice({
     name: "types",
     initialState: {
          data: [],
          status: "idle",
          error: null,
     },

     reducers: {},

     extraReducers: (builder) => {
          builder

               .addCase(fetchTypesSlice.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
               })

               .addCase(fetchTypesSlice.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.data = action.payload;

               })

               .addCase(fetchTypesSlice.rejected, (state) => {
                    state.status = "failed";
               });
     },
});
