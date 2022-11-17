import React from 'react'


function ProductCard( { productData } ) {
  
  return (
    <div>

      <p>{productData['name']}</p>
      <img src={productData.image} alt="bike" width="200" height="175" />
    
    </div>
  )
}

export default ProductCard
