import React from 'react'
import ReactDOM from "react-dom/client";
import { useState } from 'react'
import reactImg from '../assets/react.svg'
import { createBrowserRouter, RouterProvider, Link, BrowserRouter } from "react-router-dom";

import Home from './Home.jsx'
import Shop from './Shop.jsx'
import Cart from './Cart.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "shop",
    element: <Shop />,
  },
  {
    path: "cart",
    element: <Cart />,
  },
]);

function App() {

  return (
   <>
   <div className='header'>
    <img src={reactImg}></img>
    <BrowserRouter>
    <div>
      <Link to="/">Home</Link>
      <Link to="shop">Shop</Link>
      <Link to="cart">Cart</Link>
    </div>
    </BrowserRouter>
   </div>
   <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
   </>
  )
}

export default App
