import React, { useEffect, useState } from 'react'
import axios from "axios";


function CartCard({ productId, quantity, currentToken }) {

  const [productData, setProductData] = useState(); 


  useEffect(() => {

    let getProductAndQuantity = async () => {
      
      // let baseURL = 
      let baseURL = 'https://store-backend-arv3.onrender.com/'
      let queryUrl = baseURL + 'api/products/single/' + productId
      
      let newProductData = await axios.get(queryUrl, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      console.log('newProductData.data: ', newProductData.data)

      setProductData(newProductData.data)
    };
  
    getProductAndQuantity()
    
  }, []);


  return (
    <div>
      <>
        {
          productData &&
          <>
            <p>{productData.brand}: {productData.name}</p>
            <img src={productData.image} alt={productData.name} width="200" height="175" />
            <p>Unit price: ${productData.price / 100}.00</p>
            <p>Quantity: {quantity}</p> 
          </>
        }
      </>
      <br /> 

    </div>
  )
}

export default CartCard
