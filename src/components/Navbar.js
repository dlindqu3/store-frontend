import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ currentUser, setCurrentUser }) {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("store-user");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <header >
      { currentUser && console.log(currentUser)}
      <div >

        <div >
          <span>
            <Link to="/">Home</Link>
          </span>
        </div>

        <div >
          <div>
            <Link to="/about">About</Link>
          </div>
          {!currentUser && (
            <div>
              <Link to="/signup">Sign up</Link>
            </div>
          )}
          {!currentUser && (
            <div>
              <Link to="/login">Login</Link>
            </div>
          )}
          {currentUser && (
            <div >
              <Link to="/all-products">All Products</Link>
            </div>
          )}
          {currentUser && (
            <div >
              <Link to="/cart">Cart</Link>
            </div>
          )}
          {currentUser && (
            <div >
              <Link to="/orders">Orders</Link>
            </div>
          )}
          {currentUser && <div >{currentUser}</div>}
          {currentUser && (
            <div>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;