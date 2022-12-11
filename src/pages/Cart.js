import React, { useState, useEffect } from "react";
import axios from "axios";
import CartCard from "../components/CartCard";

function Cart({ currentToken, currentUserId }) {
  const [cart, setCart] = useState(); 
  const [cartExists, setCartExists] = useState(); 
  const [products, setProducts] = useState();

  let checkCartExists = async () => {
    let cartExistsUrl =
      "http://localhost:4000/" + "api/cart/read-cart/" + currentUserId;
    let cartData = await axios.get(cartExistsUrl, {
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    if (cartData.data[0]) {
    setCart(cartData.data[0])
    setCartExists(true)
    }
    setCartExists(false)
  };



  useEffect(() => {
    
    // checkCartExists sets state for cart if it exists 
    checkCartExists()
    
  }, []);


  return (
    <div>
      <h2>Cart Page</h2>
      {cart && cart.cartItems.map((item) => {
        return <CartCard key={item.product} productId={item.product} quantity={item.quantity}/> 
      }) }

    </div>
  );
}

export default Cart;
