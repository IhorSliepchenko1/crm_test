import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import MainPage from "./pages/mainPage";
import CashRegister from "./pages/cashRegister";
import Registration from "./pages/registration";
import Layout from "./components/layout";
import Expenses from "./pages/expenses";
import Login from "./pages/login";


// роуты
const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/welcome",
        element: <MainPage />,
      },
      {
        path: "/cash-register",
        element: <CashRegister />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/expenses",
        element: <Expenses />,
      },
    ],
  },
]);


const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App