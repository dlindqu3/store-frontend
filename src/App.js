import React, { useState } from "react"
import axios from "axios"

function App() {

  const handleCheckout = async () => {
    let baseURL = 'http://localhost:4000'
    let queryUrl = baseURL + "/create-checkout-session"
    let reqBody = { items: [
      { id: 1, quantity: 2 }, 
      { id: 2, quantity: 3 }
    ]}
    // By default, if the 2nd parameter to axios.post() is an object, Axios serializes the object to JSON using the JSON.stringify() function.
    // so, you can often omit the headers argument, if all you care about is the content type 
    // axios.post(url, body, headers)
    let newData = await axios.post(queryUrl, reqBody)
    console.log('newData', newData) 
    // if the request is successful, redirect the user 
  }


  return (
    <div className="App">
      <p>Get Stripe Stuff</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default App;
