import React from 'react'

function CheckoutSuccess({ currentToken, currentUserId }) {
  
  return (
    <div>
      <h1>Checkout Success Page</h1>
      {console.log('currentUserId from CheckoutSuccess: ', currentUserId)}
      {console.log('currentToken from CheckoutSuccess: ', currentToken)} 
    </div>
  )
}

export default CheckoutSuccess