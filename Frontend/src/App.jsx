import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Categories from "./Pages/Categories";
import Shop from "./Pages/Shop";
import Login from "./Pages/Login";
import AccountPage from "./Pages/Account";
import ProductDetail from "./Pages/ProductDetail";
import Order from "./Pages/Order";
import CartPage from "./Pages/Cartpage";
import Wishlist from "./Pages/wishlist";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/Navbar";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <> <Navbar/> <Home/> </>,
    },
    {
      path: "/shop",
      element: <> <Navbar/> <Shop/> </>,
    },
    {
      path: "/shop/:id",
      element: <> <Navbar/> <ProductDetail/>  </>,
    },
    {
      path : "/Categories",
      element : <><Navbar/> <Categories/> </>
    },
    {
      path : "/About",
      element : <> <Navbar/> <About/></>
    },
    {
      path: "/Login",
      element : <><Navbar/> <Login/></>,
    },
    {
      path: "/Account",
      element : <><Navbar/> <AccountPage/></>,
    },
    {
      path: "/Order",
      element : <><Navbar/> <Order/></>,
    },
    {
      path : "/Cartpage",
      element : <> <Navbar/> <CartPage/></>
    },
    {
      path:"/wishlist",
      element :<><Navbar/> <Wishlist/></>
    },

  ]);

  return <RouterProvider router={router} />;
}
