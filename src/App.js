import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { useState } from "react"
import Navbar from "./components/Navbar"
import Checkout from "./pages/Checkout"
import CheckoutSuccess from "./pages/CheckoutSuccess"
import CheckoutCancel from "./pages/CheckoutCancel"
import AllProducts from "./pages/AllProducts"
import Orders from "./pages/Orders"
import Cart from "./pages/Cart"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import About from "./pages/About"


function App() {

  const [currentUser, setCurrentUser] = useState()

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar setCurrentUser={setCurrentUser} currentUser={currentUser}/>
      <Routes>
      <Route path="/" element={<Home />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/signup" element={<SignUp setCurrentUser={setCurrentUser} />} exact />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} exact />
        <Route path="/all-products" element={<AllProducts />} exact />
        <Route path="/cart" element={<Cart />} exact />
        <Route path="/orders" element={<Orders />} exact />
        <Route path="/checkout" element={<Checkout />} exact />
        <Route path="/checkout/success" element={<CheckoutSuccess />} exact />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} exact />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
