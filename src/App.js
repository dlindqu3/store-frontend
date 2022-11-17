import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from "react"
import Checkout from "./pages/Checkout"
import CheckoutSuccess from "./pages/CheckoutSuccess"
import CheckoutCancel from "./pages/CheckoutCancel"
import Home from "./pages/Home"


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} exact />
        <Route path="/checkout" element={<Checkout />} exact />
        <Route path="/checkout/success" element={<CheckoutSuccess />} exact />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} exact />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
