import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ currentUser, currentToken, Component }) {
  return (
    <div>
        { currentUser ? <Component currentUser={currentUser} currentToken={currentToken}/> : <Navigate to="/login" /> } 
    </div>
  )
}

export default ProtectedRoute
