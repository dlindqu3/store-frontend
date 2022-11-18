import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import axios from 'axios'

function AllProducts({ currentUser }) {

  const [errorText, setErrorText] = useState()
  const [products, setProducts] = useState()

  useEffect(() => {
    //Runs only on the first render
    let getProducts = async () => {
    let baseURL = 'http://localhost:4000'
    let queryUrl = baseURL + '/api/products/get-all-products'
    try {
      let resData = await axios.get(queryUrl)
      let productsArray = resData.data.allProducts
      setProducts(productsArray)
    } catch (err){
      console.log(err.message)
    }
    }  
    getProducts()

  }, []);


  return (
    <div>
      <h2>All Products</h2>
      {products && products.map((item) => {
          return <ProductCard productData={item} key={item._id}/>
      })}
      {products && console.log(products)}
      {errorText && console.log('error text: ', errorText)}
    </div>
  )
}

export default AllProducts
