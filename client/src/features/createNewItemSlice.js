import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCreateNewItem = createAsyncThunk(
     "createNewItem/fetchCreateNewItem",
     async ({ url, name = "", data, token }, { rejectWithValue }) => {
          try {
               let contentType = await name === `expenses` ? "multipart/form-data" : "application/json"
               const response = await axios.post(url, data, {
                    headers: {
                         "Content-Type": contentType,
                         "Authorization": token
                    },
               });

               console.log(response.headers

               );


               return response.data
          } catch (error) {
               return rejectWithValue(
                    error.response ? error.response.data : error.message
               );
          }
     }
);

export const createNewItemSlice = createSlice({
     name: "delete",
     initialState: {
          status: "idle",
          error: null,
     },

     reducers: {},

     extraReducers: (builder) => {
          builder

               .addCase(fetchCreateNewItem.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
               })

               .addCase(fetchCreateNewItem.fulfilled, (state) => {
                    state.status = "succeeded";
               })

               .addCase(fetchCreateNewItem.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload;
               });
     },
});
