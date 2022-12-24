import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
import jwt_decode from "jwt-decode";
import ProtectedRoute from "./components/ProtectedRoute";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutCancel from "./pages/CheckoutCancel";
import AllProducts from "./pages/AllProducts";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import About from "./pages/About";
import Container from "react-bootstrap/Container";

function App() {
  // this is a username
  const [currentUser, setCurrentUser] = useState();
  // email is unique in db
  const [currentEmail, setCurrentUserEmail] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [currentToken, setCurrentToken] = useState();
  // checkoutIncrement will increment up by one after every checkout success or failure, ensuring that the useEffect callback is called each time
  // this solves a problem I had, in which useEffect was not firing after checkout, so the app did not know about the current user
  const [checkoutIncrement, setCheckoutIncrement] = useState(0);
  const [checkoutSessionId, setCheckoutSessionId] = useState();

  let checkUserData = () => {
    let userData = localStorage.getItem("store-user");
    if (userData) {
      let userData2 = JSON.parse(userData);
      // console.log('userData2: ', userData2)
      // console.log(typeof userData2)

      // check to see if userData's token has expired
      let existingToken = userData2.token;
      // console.log("existingToken: ", existingToken);
      var decoded = jwt_decode(existingToken);
      // console.log('decoded: ', decoded)

      let expTime = decoded.exp;
      let currentTime = (new Date().getTime() + 1) / 1000;
      // console.log(expTime, currentTime)

      if (expTime > currentTime) {
        // if it has not expired, set state values for existing user info
        // console.log('existing user still valid')
        setCurrentUserEmail(userData2.email);
        setCurrentUser(userData2.username);
        setCurrentToken(userData2.token);
        setCurrentUserId(userData2._id);
      } else {
        // if it has expired, clear localStorage
        // console.log("existing user not valid, local storage cleared")
        localStorage.clear();
      }
    }
  };

  useMemo(() => {
    // console.log("useMemo called");
    checkUserData(); //Doesn't want until render is completed
  }, [checkoutIncrement]);

  // useEffect: see if there is a "store-user" object already in local storage; run only on first render
  useEffect(() => {
    // console.log("useEffect called");
    checkUserData();
  }, [checkoutIncrement]);

  return (
    <div className="App">
      {/* {console.log("page rendered")} */}
      <BrowserRouter>
        <NavbarComponent
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
        />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/about" element={<About />} exact />
            <Route
              path="/signup"
              element={
                <SignUp
                  setCurrentToken={setCurrentToken}
                  setCurrentUser={setCurrentUser}
                  setCurrentUserEmail={setCurrentUserEmail}
                  setCurrentUserId={setCurrentUserId}
                />
              }
              exact
            />
            <Route
              path="/login"
              element={
                <Login
                  setCurrentToken={setCurrentToken}
                  setCurrentUser={setCurrentUser}
                  setCurrentUserEmail={setCurrentUserEmail}
                  setCurrentUserId={setCurrentUserId}
                />
              }
              exact
            />

            <Route
              path="/all-products"
              element={
                <ProtectedRoute
                  Component={AllProducts}
                  currentUser={currentUser}
                  currentToken={currentToken}
                  currentUserId={currentUserId}
                />
              }
              exact
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute
                  Component={Cart}
                  currentUser={currentUser}
                  currentEmail={currentEmail}
                  currentToken={currentToken}
                  currentUserId={currentUserId}
                  checkoutIncrement={checkoutIncrement}
                  setCheckoutIncrement={setCheckoutIncrement}
                  checkoutSessionId={checkoutSessionId}
                  setCheckoutSessionId={setCheckoutSessionId}
                />
              }
            />

            <Route
              path="/checkout/success"
              element={
                <ProtectedRoute
                  Component={CheckoutSuccess}
                  currentUser={currentUser}
                  currentToken={currentToken}
                  currentUserId={currentUserId}
                />
              }
            />

            <Route
              path="/checkout/cancel"
              element={
                <ProtectedRoute
                  Component={CheckoutCancel}
                  currentUser={currentUser}
                  currentToken={currentToken}
                  currentUserId={currentUserId}
                />
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute
                  Component={Orders}
                  currentUser={currentUser}
                  currentToken={currentToken}
                  currentUserId={currentUserId}
                />
              }
            />
          </Routes>
        </Container>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
