import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RequestState } from "../../types/types";
import { URL } from "../../api/baseUrl";


type data = {
     login: string;
     password: string
}


export const fetchLogin = createAsyncThunk(
     "login/fetchLogin",
     async ({ data }: { data: data }, { rejectWithValue }) => {
          try {
               const response = await axios.post(`${URL}/user/login`, data, {
                    headers: {
                         "Content-Type": "application/json",
                    },
               });
               return response.data;
          } catch (error) {
               const errorResponse = error as AxiosError;
               return rejectWithValue(errorResponse.message);
          }
     }
);

const loginSlice = createSlice({
     name: "login",
     initialState: {
          token: localStorage.getItem("token") || null as string | null,
          status: "idle" as RequestState,
     },
     reducers: {
     },

     extraReducers: (builder) => {
          builder.addCase(fetchLogin.pending, (state) => {
               state.status = "pending";
          });

          builder.addCase(fetchLogin.fulfilled, (state, action) => {
               state.status = "fulfilled";
               state.token = action.payload;
               localStorage.setItem("token", JSON.stringify(state.token))
          });

          builder.addCase(fetchLogin.rejected, (state) => {
               state.status = "rejected";
          });
     },
});

export const token = loginSlice.reducer;
