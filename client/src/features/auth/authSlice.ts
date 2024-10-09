import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RequestState } from "../../types/types";
import { URL } from "../../api/baseUrl";


type initialState = {
     token: string | null;
     status: RequestState
}

export const fetchAuth = createAsyncThunk(
     "auth/fetchAuth",
     async (token: string, { rejectWithValue }) => {
          try {

               const response = await axios.get(`${URL}/user/auth`, {
                    headers: {
                         "Content-Type": "application/json",
                         "Autorization": `Barear ${token}`
                    },
               });




               return response.data;
          } catch (error) {
               const errorResponse = error as AxiosError;
               return rejectWithValue(errorResponse.message);
          }
     }
);

export const authSlice = createSlice({
     name: "auth",
     initialState: {
          token: JSON.parse(localStorage.getItem("token") as string) || null as string | null,
          status: "idle",
     } as initialState,

     reducers: {
          logout: (state) => {
               state.token = null;
               localStorage.removeItem("token");
               location.reload()
          },
     },
     extraReducers: (builder) => {
          builder.addCase(fetchAuth.pending, (state) => {
               state.status = "pending";
          });

          builder.addCase(fetchAuth.fulfilled, (state, action) => {
               state.token = action.payload;
               localStorage.setItem("token", JSON.stringify(state.token))
          });

          builder.addCase(fetchAuth.rejected, (state) => {
               state.status = "rejected";
          });
     },
});

export const { logout } = authSlice.actions;