import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDeleteOrPut } from "../hooks/useDeleteOrPut";

export const fetchUpdate = createAsyncThunk(
     "update/fetchUpdate",
     async ({ name, id, token, data }, { rejectWithValue }) => {
          const url = useDeleteOrPut(name, id)
          try {

               const response = await axios.put(url, data, {
                    headers: {
                         "Content-Type": "application/json",
                         "Authorization": token
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

export const updateSlice = createSlice({
     name: "delete",
     initialState: {
          status: "idle",
          error: null,
     },

     reducers: {},

     extraReducers: (builder) => {
          builder

               .addCase(fetchUpdate.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
               })

               .addCase(fetchUpdate.fulfilled, (state) => {
                    state.status = "succeeded";
               })

               .addCase(fetchUpdate.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload;
               });
     },
});
