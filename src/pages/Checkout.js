import React from 'react'
import axios from "axios"

function Checkout() {

  
  const handleCheckout = async () => {

    let baseURL = 'http://localhost:4000'
    let queryUrl = baseURL + "/api/checkout/create-checkout-session"

    console.log('queryUrl: ', queryUrl)
    let reqBody = { items: [
      { id: 1, quantity: 1 }, 
      { id: 2, quantity: 1 }
    ]}
    // By default, if the 2nd parameter to axios.post() is an object, Axios serializes the object to JSON using the JSON.stringify() function.
    // so, you can often omit the headers argument, if all you care about is the content type 

    let newData = await axios.post(queryUrl, reqBody)
    console.log('newData', newData) 
    if (newData['data']['url']){
      window.location.href = newData.data.url
    }
 
  }

  return (
    <div>
       <p>Get Stripe Stuff</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  )
}

export default Checkout
