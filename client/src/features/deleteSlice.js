import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDeleteOrPut } from "../hooks/useDeleteOrPut";

export const fetchDelete = createAsyncThunk(
     "delete/fetchDelete",
     async ({ name, id, token }, { rejectWithValue }) => {
          const url = useDeleteOrPut(name, id)
          try {

               const response = await axios.delete(url, {
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

export const deleteSlice = createSlice({
     name: "delete",
     initialState: {
          status: "idle",
          error: null,
     },

     reducers: {},

     extraReducers: (builder) => {
          builder

               .addCase(fetchDelete.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
               })

               .addCase(fetchDelete.fulfilled, (state) => {
                    state.status = "succeeded";
               })

               .addCase(fetchDelete.rejected, (state) => {
                    state.status = "failed";
               });
     },
});
