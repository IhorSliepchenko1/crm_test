import { createBrowserRouter } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Layout from "./components/layout";
import Expenses from "./pages/expenses/Expenses";
import CashRegister from "./pages/cashRegister/CashRegister";
import Registration from "./pages/registration/Registration";

export const router = createBrowserRouter([
     {
          path: "/auth",
          element: <Auth />,
     },

     {
          path: "/",
          element: <Layout />,
          children: [
               {
                    path: "/",
                    element: <CashRegister />
               },
               {
                    path: "/expenses",
                    element: <Expenses />
               },
               {
                    path: "/register",
                    element: <Registration />
               },
          ],
     },
]);