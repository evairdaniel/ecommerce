import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import CartPage from "../pages/cart"
import HomePage from "../pages/home"
import LoginPage from "../pages/login"
import OrdersPage from "../pages/orders"
import ProductPage from "../pages/product"
import ProfilePage from "../pages/profile"
import RegisterPage from "../pages/register"
import { ProtectedRoute } from "./ProtectedRoute"

const Routes = () => {

  const routes = [
    {
      path: "/home",
      element: <HomePage />
    },
    {
      path: "/",
      element: <Navigate to="/home" replace />
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/cart",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <CartPage />
        }
      ]
    },
    {
      path: "/profile",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <ProfilePage />
        }
      ]
    },
    {
      path: "/orders",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <OrdersPage />
        }
      ]
    },
    {
      path: "/products",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <ProductPage />
        }
      ]
    },
    {
      path: "/register",
      children: [
        {
          path: "",
          element: <RegisterPage />
        }
      ]
    },
    {
      path: "*",
      element: <div>Página não encontrada</div>
    }
  ]


  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

export default Routes