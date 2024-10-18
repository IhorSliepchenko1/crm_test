import { createSlice } from "@reduxjs/toolkit"
// import { User } from "../../app/types"
import { userApi } from "../../app/services/userApi"
import { RootState } from "../../app/store"

interface InitialState {
     // user: User | null
     isAuthenticated: boolean
     // current: string | null
     token: string | null
}

const initialState: InitialState = {
     // user: null,
     isAuthenticated: false,
     token: null,
}

const slice = createSlice({
     name: `user`,
     initialState,
     reducers: {
          logout: (state) => {
               // state.user = null
               state.isAuthenticated = false
               state.token = null
               localStorage.removeItem(`token`)
          }

     },

     extraReducers: (builder) => {
          builder
               .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
                    state.token = action.payload.token
                    state.isAuthenticated = true
               })
               .addMatcher(userApi.endpoints.check.matchFulfilled, (state, action) => {
                    state.token = action.payload.token
                    state.isAuthenticated = true
               })
          // .addMatcher(
          //      userApi.endpoints.getUserById.matchFulfilled,
          //      (state, action) => {
          //           state.user = action.payload
          //      },
          // )
     },
})

export const { logout } = slice.actions
export default slice.reducer

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
// export const selectCurrent = (state: RootState) => state.auth.current
// export const selectUser = (state: RootState) => state.auth.user