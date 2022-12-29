import React from 'react'

function CheckoutSuccess({ currentToken, currentUserId }) {
  
  return (
    <div>
      <h3>You have completed a checkout session. Please feel free to continue browsing for other products.</h3>
      {/* {console.log('currentUserId from CheckoutSuccess: ', currentUserId)} */}
      {/* {console.log('currentToken from CheckoutSuccess: ', currentToken)}  */}
    </div>
  )
}

export default CheckoutSuccess