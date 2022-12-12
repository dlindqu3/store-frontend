import React, { useEffect, useState } from 'react'
import axios from "axios";
import { toContainHTML } from '@testing-library/jest-dom/dist/matchers';

function CartCard({ productId, quantity, currentToken, totalCost, setTotalCost }) {

  const [productData, setProductData] = useState(); 


  useEffect(() => {

    let getProductAndQuantity = async () => {
      
      let baseURL = 'http://localhost:4000'
      let queryUrl = baseURL + '/api/products/single/' + productId
      
      let newProductData = await axios.get(queryUrl, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      console.log('newProductData.data: ', newProductData.data)

      // let addedCost = newProductData.data.price * quantity
      // console.log('addedCost / 100: ', addedCost / 100)
      // console.log('totalCost: ', totalCost)
      // setTotalCost(() => { return totalCost += addedCost})
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
