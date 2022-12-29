import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import axios from 'axios'

function AllProducts({ currentUser, currentToken, currentEmail, currentUserId }) {

  const [errorText, setErrorText] = useState()
  const [products, setProducts] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    //Runs only on the first render
    // let baseURL = "http://localhost:4000/"
    let baseURL = 'https://store-backend-arv3.onrender.com/'
    let queryUrl = baseURL + 'api/products/get-all-products'

    let getProducts = async () => {
    try {

    // console.log('currentUser: ', currentUser, "currentToken: ", currentToken)
      let resData = await axios.get(queryUrl, {
        headers: { Authorization: `Bearer ${currentToken}` }
    })
      let productsArray = resData.data.allProducts
      // console.log('productsArray: ', productsArray)
      setProducts(productsArray)
    } catch (err){
      setErrorText(err.message)
      // console.log(err.message)
    }
    }  
    getProducts()
    setIsLoading(false)
  }, []);



  return (
    <div>

    {/* { currentUser && console.log(currentUser, ' currentUser from AllProducts')} */}
    {/* {currentToken && console.log(currentToken, ' currentToken from allProducts')} */}
      <h2 style={{ display: 'flex', flexWrap: "wrap", justifyContent: 'center' }}>All Products</h2>

      {isLoading && <p>Loading...</p>}
      <div style={{ display: 'flex', flexWrap: "wrap", justifyContent: 'center' }}>
      {products && products.map((item) => {
          return <ProductCard productData={item} key={item._id} currentEmail={currentEmail}  currentUserId={currentUserId}  currentToken={currentToken} />
      })}
      </div>
      {errorText && console.log('error text: ', errorText)}
    </div>
  )
}

export default AllProducts
