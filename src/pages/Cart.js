import React, { useState, useEffect } from "react";
import axios from "axios";
import CartCard from "../components/CartCard";

function Cart({ currentToken, currentUserId }) {
  const [cart, setCart] = useState(); 
  const [totalCost, setTotalCost] = useState(0)


  let getCartTotalCost = async (cartItems) => {
    let cartTotalCost = 0

    let baseURL = 'http://localhost:4000'
   
    for (let i = 0; i < cartItems.length; i++){
      let currentItem = cartItems[i]
      let currentQuantity = currentItem.quantity 
      let currentProductId = currentItem.product
      let queryUrl = baseURL + '/api/products/single/' + currentProductId
      let newProductData = await axios.get(queryUrl, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      let currentProductUnitPrice = newProductData.data.price
      let currentProductTotalPrice = currentProductUnitPrice * currentQuantity
      cartTotalCost += currentProductTotalPrice
    }
    setTotalCost(cartTotalCost)
  }

  useEffect(() => {

    let checkCartExists = async () => {
      
      let cartExistsUrl =
        "http://localhost:4000/" + "api/cart/read-cart/" + currentUserId;
      
        let cartData = await axios.get(cartExistsUrl, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      if (cartData.data[0]) {
        console.log('cartData.data: ', cartData.data)
        
        // this sets cart total cost 
        getCartTotalCost(cartData.data[0].cartItems)

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
        return <CartCard key={item.product} productId={item.product} quantity={item.quantity} currentToken={currentToken} currentUserId={currentUserId}
        totalCost={totalCost} setTotalCost={setTotalCost}
        /> 
      }) }

      {/* FIX THIS */}
      {cart && <p>Total: ${totalCost / 100}.00</p>}
    </div>
  );
}

export default Cart;
