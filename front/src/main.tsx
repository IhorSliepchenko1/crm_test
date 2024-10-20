import { createRoot } from 'react-dom/client'
import './index.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { AuthGuard } from './features/authGuard'
import { NextUIProvider } from '@nextui-org/react'
import { Layout } from './app/components/layout'
import { ThemeProvider } from './theme-provider'
import { Auth } from './pages/auth'
import { CashRegister } from './pages/cash-register'
import { TypeExpenses } from './pages/type-expenses'
import { Expenses } from './pages/expenses'

const container = document.getElementById("root")

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
        path: "",
        element: <CashRegister />,
      },

      {
        path: "/expenses",
        element: <Expenses />,
      },
      // {
      //   path: "/register",
      //   element: <p>register</p>,
      // },
      {
        path: "/type-expenses",
        element: <TypeExpenses />,
      },
    ],
  },
])

if (container) {
  const root = createRoot(container)

  root.render(
    <Provider store={store}>
      <NextUIProvider>
        <ThemeProvider>
          <AuthGuard>
            <RouterProvider router={router} />
          </AuthGuard>
        </ThemeProvider>
      </NextUIProvider>
    </Provider>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
