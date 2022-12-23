import React, { useState, useEffect } from "react";
import axios from "axios";
import CartCard from "../components/CartCard";

function Cart({ currentToken, currentUserId, checkoutIncrement, setCheckoutIncrement, checkoutSessionId, setCheckoutSessionId, currentEmail }) {
  const [cart, setCart] = useState(); 
  const [totalCost, setTotalCost] = useState(0)

  let baseURL = "https://store-backend-arv3.onrender.com/"
  // let baseURL = "http://localhost:4000/"

  let getCartTotalCost = async (cartItems) => {
    let cartTotalCost = 0
   
    for (let i = 0; i < cartItems.length; i++){
      let currentItem = cartItems[i]
      let currentQuantity = currentItem.quantity 
      let currentProductId = currentItem.product
      let queryUrl = baseURL + 'api/products/single/' + currentProductId
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
      
      let cartExistsUrl = baseURL + "api/cart/read-cart/" + currentUserId;
      
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
  let clearCart = async () => {

    let deleteCartUrl = baseURL + "api/cart/delete-cart/" + cart._id;
    let deletedCart = await axios.delete(deleteCartUrl, {
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    setCart(null)
    console.log('deletedCart: ', deletedCart)
  }

  const handleCheckout = async () => {

    let queryUrl = baseURL + "api/checkout/combo/handle-get-details-then-checkout"

    // items is an array of objects like {id: 5, quantity: 30}
    let reqBody = { items: [], userId: currentUserId, userEmail: currentEmail}
    for (let i = 0; i < cart.cartItems.length; i++){
      let currentCartItem = cart.cartItems[i]
      let newObj = {}
      newObj['id'] = currentCartItem.product
      newObj['quantity'] = currentCartItem.quantity
      reqBody['items'].push(newObj)
    }
    // By default, if the 2nd parameter to axios.post() is an object, Axios serializes the object to JSON using the JSON.stringify() function.
    // so, you can often omit the headers argument, if all you care about is the content type 

    let checkoutData
    try {
      checkoutData = await axios.post(queryUrl, reqBody, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      // checkoutData.data includes an object with {url, sesssionId}
      console.log('checkoutData.data: ', checkoutData.data)
    } catch (err){
      console.log('error: ', err.message)
    }

    if (checkoutData.data.url){
      setCheckoutSessionId(checkoutData.data.sessionId)
      // this setCheckoutIncrement causes state to change before the app re-renders after checkout
      // because of this state change, the useMemo hook in App.js will run
      // useMemo runs before anything renders
      // thus, the useMemo will be able to check for user data in local storage before other components render  
      setCheckoutIncrement(checkoutIncrement ++)
      window.location.href = checkoutData.data.url
    }
 
  }

  // if the checkout succeeds, call the webhook 
  

  return (
    <div>
      <h2>Cart Page</h2>

      {console.log('currentUserId from Cart: ', currentUserId)}
      {console.log('currentToken from Cart: ', currentToken)} 
      
      {!cart && <p>Your cart is empty.</p>}
      {cart && console.log('cart state: ', cart)}
      {cart && cart.cartItems.map((item) => {
        return <CartCard key={item.product} productId={item.product} quantity={item.quantity} currentToken={currentToken} currentUserId={currentUserId}
        totalCost={totalCost} setTotalCost={setTotalCost}
        /> 
      }) }

      {cart && <p>Total: ${totalCost / 100}.00</p>}
      {cart && <button onClick={clearCart}>Delete cart</button>}
      <br /> 
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Cart;
