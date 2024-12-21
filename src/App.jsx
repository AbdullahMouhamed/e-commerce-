import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import Home from "./pages/home/Home"
import Layout from "./components/layout/Layout"
import toast, { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/protectedroute/ProtectedRoute';
import GuestRoute from "./components/guestroute/GuestRoute"
import UserProvider from "./context/User.Context"
import CartProvider from "./context/Cart.Context"
import Cart from "./pages/cart/Cart"
import ProductDetails from "./pages/productDetails/ProductDetails"
import ChoosePayment from "./pages/orders/ChoosePayment"
import AllOrders from "./pages/allOrders/AllOrders"
import Products from './pages/products/Products';
import Categories from "./pages/categories/Categories"
import Brands from './pages/brands/Brands';
import Wishlist from "./pages/wishlist/Wishlist"
import WishlistProvider from "./context/Wishlist.Context"
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import Verify from "./pages/verify/Verify"


function App() {
  const router = createBrowserRouter([
    {
      path: "/", element:
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      , children: [
        { path: "/category/:id", element: <h2>category</h2> },
        { index: true, element: <Home /> },
        { path: "/cart", element: <Cart /> },
        { path: "/productdetails/:id", element: <ProductDetails /> },
        { path: "/choosepayment", element: <ChoosePayment /> },
        { path: "/allorders", element: <AllOrders /> },
        { path: "/products", element: <Products /> },
        { path: "/categories", element: <Categories /> },
        { path: "/brands", element: <Brands /> },
        { path: "/wishlist", element: <Wishlist /> },
   
      ]
    },
    {
      path: "/",
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "forgotpassword", element: <ForgotPassword /> },
        { path: "verify", element: <Verify /> },
        
      ]
    }
  ])

  return (
    <>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            <RouterProvider router={router} />
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
      <Toaster position="top-right"
        reverseOrder={false} />

    </>
  )
}

export default App
