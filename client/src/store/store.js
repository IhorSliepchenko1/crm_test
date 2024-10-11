import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "../features/user/loginSlice";
import { cashRegisterSlice } from "../features/cashRegisterSlice/cashRegisterSlice";
import { expensesSlice } from "../features/expensesSlice/expensesSlice";
import { typesSlice } from "../features/typesSlice/typesSlice";


export const store = configureStore({
     reducer: {
          token: loginSlice.reducer,
          cashRegister: cashRegisterSlice.reducer,
          expenses: expensesSlice.reducer,
          type: typesSlice.reducer,
     },
});