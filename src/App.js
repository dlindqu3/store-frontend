import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { useState } from "react"
import ProtectedRoute from "./components/ProtectedRote"
import CheckoutSuccess from "./pages/CheckoutSuccess"
import CheckoutCancel from "./pages/CheckoutCancel"
import AllProducts from "./pages/AllProducts"
import Navbar from "./components/Navbar"
import Checkout from "./pages/Checkout"
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

        <Route 
            path="/all-products"
            element={<ProtectedRoute 
                      Component={AllProducts} 
                      currentUser={currentUser} 
                    />}
        /> 

        <Route 
            path="/cart"
            element={<ProtectedRoute 
                      Component={Cart} 
                      currentUser={currentUser} 
                    />}
        /> 

        <Route 
            path="/orders"
            element={<ProtectedRoute 
                      Component={Orders} 
                      currentUser={currentUser} 
                    />}
        /> 
      
        <Route 
            path="/checkout"
            element={<ProtectedRoute 
                      Component={Checkout} 
                      currentUser={currentUser} 
                    />}
        /> 
   
        <Route 
            path="/checkout/success"
            element={<ProtectedRoute 
                      Component={CheckoutSuccess} 
                    />}
        /> 
             
        <Route 
            path="/checkout/cancel"
            element={<ProtectedRoute 
                      Component={CheckoutCancel} 
                    />}
        /> 

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
