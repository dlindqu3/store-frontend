import React, { useState, useEffect } from "react";
import axios from "axios";
import CartCard from "../components/CartCard";

function Cart({ currentToken, currentUserId }) {
  const [cart, setCart] = useState(); 
  const [products, setProducts] = useState();


  useEffect(() => {

    let checkCartExists = async () => {
      
      let cartExistsUrl =
        "http://localhost:4000/" + "api/cart/read-cart/" + currentUserId;
      
        let cartData = await axios.get(cartExistsUrl, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      if (cartData.data[0]) {
        console.log('cartData.data: ', cartData.data)
        setCart(cartData.data[0])
      }
    };
  
    checkCartExists()
    
  }, []);

  // add a "clear cart" button 

  return (
    <div>
      <h2>Cart Page</h2>
      {!cart && <p>Your cart is empty.</p>}
      {cart && cart.cartItems.map((item) => {
        return <CartCard key={item.product} productId={item.product} quantity={item.quantity} currentToken={currentToken} currentUserId={currentUserId}/> 
      }) }

    </div>
  );
}

export default Cart;
