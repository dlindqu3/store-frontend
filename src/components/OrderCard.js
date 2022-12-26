import React, { useEffect, useState } from 'react'
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function OrderCard({ currentToken, orderData }) {
  
  const [productsData, setProductsData] = useState([])

  useEffect(() => {
  
    let arr = []

    let baseURL = 'https://store-backend-arv3.onrender.com/'
    let queryUrl = baseURL + 'api/products/single/'

    let getProductDetails = async () => {
      for (let i = 0; i < orderData.orderItems.length; i++){
        let currentObj = {}
        let currentItem = orderData.orderItems[i]
        currentObj["quantity"] = currentItem.quantity 
        let currentItemId = currentItem.product
        let currentUrl = queryUrl + currentItemId
        let currentItemDetails = await axios.get(currentUrl, {
          headers: { Authorization: `Bearer ${currentToken}` },
        })
        currentObj["details"] = currentItemDetails.data
        arr.push(currentObj)
      }
      setProductsData(arr)
    }

    getProductDetails()
  }, []);

  return (
    <div>
      { 
        productsData && orderData ? console.log("productsData: ", productsData, "orderData: ", orderData) : <></>
      }

      {
        productsData && (
          <>
            <Card style={{ minWidth: "18rem", width: "35rem", marginBottom: "10px", marginTop: "10px" }}>
              <Card.Body>
                <Card.Title>Order date: {orderData.createdAt.split("T")[0]}</Card.Title>
                {productsData.map((item) =>{
                  return <>
                    <Card.Text>{item.details.name} x{item.quantity}</Card.Text>
                  </>
                })}
                
                <Card.Text>Total cost: ${orderData.totalCost / 100}.00</Card.Text>
              </Card.Body>
            </Card>
          </>
        )
      }

      {/* {orderData && console.log('orderData from OrderCard: ', orderData)}
      <p>Order date: {orderData.createdAt.split("T")[0]}</p>
      {productsData && productsData.map((obj) =>{
        return <>
          <p>{obj.details.name}</p>
          <p>Unit price: ${obj.details.price / 100}.00</p>
          <p>Quantity: {obj.quantity}</p>
        </>
      })}
      <p>Total cost: ${orderData.totalCost / 100}.00</p>
      <p>Shipped to: </p>
      <p>{orderData.shippingAddress.line1}</p>
      {orderData.shippingAddress.line2 &&  <p>{orderData.shippingAddress.line2}</p>}
      <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.postal_code}</p>
      <p>{orderData.shippingAddress.country}</p>
      {console.log('productsData: ', productsData)}
      <br /> */}
    </div>
  )
}

export default OrderCard
