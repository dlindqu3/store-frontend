import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { useState, useEffect } from "react"
import ProtectedRoute from "./components/ProtectedRoute"
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

  // this is a username 
  const [currentUser, setCurrentUser] = useState()
  // email is unique in db 
  const [currentEmail, setCurrentUserEmail] = useState()
  const [currentUserId, setCurrentUserId] = useState()
  const [currentToken, setCurrentToken] = useState()

  // useEffect: see if there is a "store-user" object already in local storage; run only on first render 
  useEffect(() => {
    let checkUserData = () => {
      let userData = localStorage.getItem('store-user')
      if (userData){
        // check to see if token has expired 

        // if it has not expired, set currentUser, currentToken 

        // if it has expired, clear localStorage
        
      }
    }
    checkUserData()
  }, []);


  return (
    <div className="App">
      <BrowserRouter>
      <Navbar setCurrentUser={setCurrentUser} currentUser={currentUser} />
      <Routes>
      <Route path="/" element={<Home />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/signup" element={<SignUp setCurrentToken={setCurrentToken} setCurrentUser={setCurrentUser} setCurrentUserEmail={setCurrentUserEmail}
        setCurrentUserId={setCurrentUserId}
        />} exact />
        <Route path="/login" element={<Login setCurrentToken={setCurrentToken} setCurrentUser={setCurrentUser} setCurrentUserEmail={setCurrentUserEmail}
        setCurrentUserId={setCurrentUserId}
        />} exact />

        <Route 
            path="/all-products"
            element={<ProtectedRoute 
                      Component={AllProducts} 
                      currentUser={currentUser} 
                      currentToken={currentToken}
                      currentUserId={currentUserId}
                    />}
        /> 

        <Route 
            path="/cart"
            element={<ProtectedRoute 
                      Component={Cart} 
                      currentUser={currentUser} 
                      currentToken={currentToken}
                    />}
        /> 

        <Route 
            path="/orders"
            element={<ProtectedRoute 
                      Component={Orders} 
                      currentUser={currentUser} 
                      currentToken={currentToken}
                    />}
        /> 
      
        <Route 
            path="/checkout"
            element={<ProtectedRoute 
                      Component={Checkout} 
                      currentUser={currentUser} 
                      currentToken={currentToken}
                    />}
        /> 
   
        <Route 
            path="/checkout/success"
            element={<ProtectedRoute 
                      Component={CheckoutSuccess} 
                      currentUser={currentUser} 
                      currentToken={currentToken}
                    />}
        /> 
             
        <Route 
            path="/checkout/cancel"
            element={<ProtectedRoute 
                      Component={CheckoutCancel}
                      currentUser={currentUser} 
                      currentToken={currentToken} 
                    />}
        /> 

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
