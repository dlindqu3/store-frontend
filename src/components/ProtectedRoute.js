import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ currentUser, currentToken, currentEmail, currentUserId, checkoutIncrement, setCheckoutIncrement, checkoutSessionId, setCheckoutSessionId, Component }) {
  return (
    <div>
        { currentUser ? <Component currentUser={currentUser} currentToken={currentToken}  currentEmail={currentEmail}  currentUserId={currentUserId} checkoutIncrement={checkoutIncrement} setCheckoutIncrement={setCheckoutIncrement}  checkoutSessionId={checkoutSessionId} setCheckoutSessionId={setCheckoutSessionId} />  : <Navigate to="/login" /> }
        {/* {currentUser ? console.log('there is a user') : console.log('there is NOT a user')}  */}
    </div>
  )
}

export default ProtectedRoute
