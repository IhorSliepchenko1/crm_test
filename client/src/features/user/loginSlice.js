import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AppRouter from "../../http/routes";
import { headers } from "../../utils/headers";

export const fetchLogin = createAsyncThunk(
     "login/fetchLogin",
     async (data, { rejectWithValue }) => {
          try {
               const response = await axios.post(AppRouter.login, data, headers);
               console.log(response);

               return response.data.token;
          } catch (error) {
               return rejectWithValue(
                    error.response ? error.response.data : error.message
               );
          }
     }
);

export const loginSlice = createSlice({
     name: "login",
     initialState: {
          token: JSON.parse(localStorage.getItem("token")),
          status: "idle",
          error: null,
     },

     reducers: {},

     extraReducers: (builder) => {
          builder

               .addCase(fetchLogin.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
               })

               .addCase(fetchLogin.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.token = `Bearer ${action.payload}`;
                    localStorage.setItem("token", JSON.stringify(`Bearer ${action.payload}`));
               })

               .addCase(fetchLogin.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload;
               });
     },
});
