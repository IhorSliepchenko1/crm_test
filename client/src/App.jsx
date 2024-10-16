import { createBrowserRouter } from "react-router-dom";
import Auth from "./pages/auth/index";
import Layout from "./components/layout";
import Expenses from "./pages/expenses/index";
import CashRegister from "./pages/cashRegister/index";
import Registration from "./pages/registration/index";
import { RouterProvider } from "react-router-dom"
import { useTheme } from "./theme/index"

const App = () => {
  const { theme } = useTheme()

  const router = createBrowserRouter([
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


  return (

    <main className={`${theme} text-foreground bg-background p-2`}>
      <RouterProvider router={router} />
    </main>


  )
}

export default App