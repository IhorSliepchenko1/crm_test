import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/user/authSlice";
import { cashRegisterSlice } from "../features/cashRegisterSlice/cashRegisterSlice";
import { expensesSlice } from "../features/expensesSlice/expensesSlice";
import { typesSlice } from "../features/typesSlice/typesSlice";
import { loginSlice } from "../features/user/loginSlice";


export const store = configureStore({
     reducer: {
          login: loginSlice.reducer,
          auth: authSlice.reducer,
          cashRegister: cashRegisterSlice.reducer,
          expenses: expensesSlice.reducer,
          type: typesSlice.reducer,
     },
}); 