import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RequestState } from "../../types/types";


export const fetchRegistration = createAsyncThunk<[]>(
     "registration/fetchRegistration",
     async (_, { rejectWithValue }) => {
          try {
               const response = await axios.get(`URL`);
               return response.data;
          } catch (error) {
               const errorResponse = error as AxiosError;
               return rejectWithValue(errorResponse.message);
          }
     }
);

export const registrationSlice = createSlice({
     name: "registration",
     initialState: {
          data: [] as [],
          status: "idle" as RequestState,
     },
     reducers: {},
     extraReducers: (builder) => {
          builder.addCase(fetchRegistration.pending, (state) => {
               state.status = "pending";
          });

          builder.addCase(fetchRegistration.fulfilled, (state, action) => {
               state.status = "fulfilled";
               state.data = action.payload;
          });

          builder.addCase(fetchRegistration.rejected, (state) => {
               state.status = "rejected";
          });
     },
});