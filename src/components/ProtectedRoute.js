import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ currentUser, currentToken, currentEmail, currentUserId, Component }) {
  return (
    <div>
        { currentUser ? <Component currentUser={currentUser} currentToken={currentToken}  currentEmail={currentEmail}  currentUserId={currentUserId}/> : <Navigate to="/login" /> } 
    </div>
  )
}

export default ProtectedRoute
