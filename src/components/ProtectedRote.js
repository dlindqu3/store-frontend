import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRote({ currentUser, Component }) {
  return (
    <div>
        { currentUser ? <Component /> : <Navigate to="/login" /> } 
    </div>
  )
}

export default ProtectedRote
