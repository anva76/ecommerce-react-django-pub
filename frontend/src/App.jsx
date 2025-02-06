import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useGlobalContext } from "./store/context/globalContext"
import {
  Root,
  HomePage,
  Catalog,
  ProductPage,
  CartPage,
  ErrorPageGeneric,
  CheckoutPage,
  OrderListPage,
  OrderPage,
  LoginPage,
  ErrorPage404,
  RegisterPage,
} from "./pages"
import { AuthGuard } from "./components"
import AboutPage from "./pages/AboutPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPageGeneric />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "catalog",
        element: <Catalog />,
      },
      {
        path: "catalog/:id",
        element: <ProductPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <AuthGuard element={<CheckoutPage />} />,
      },
      {
        path: "orders",
        element: <AuthGuard element={<OrderListPage />} />,
      },
      {
        path: "orders/:id",
        element: <AuthGuard element={<OrderPage />} />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "*",
        element: <ErrorPage404 />,
      },
    ],
  },
])

function App() {
  return (
    <div
      className="App"
      id="App"
    >
      <RouterProvider router={router} />
    </div>
  )
}

export default App
