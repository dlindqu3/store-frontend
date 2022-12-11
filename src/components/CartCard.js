import React from 'react'

function CartCard({ productId, quantity }) {
  return (
    <div>
      <p>{productId}</p>
      <p>{quantity}</p>
      <br /> 
    </div>
  )
}

export default CartCard
