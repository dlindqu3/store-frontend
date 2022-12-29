import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";


function Orders({ currentUser, currentToken, currentEmail, currentUserId }) {
  
  const [ordersAndDetails, setOrdersAndDetails] = useState()
  const [isLoading, setIsLoading] = useState(true)


  let baseURL = "https://store-backend-arv3.onrender.com/";
  let queryUrl = baseURL + "api/orders/get-single-user-orders/" + currentUserId;
  let productUrlBase = baseURL + "api/products/single/"

  useEffect(() => {

    let ordersWithDetails = []

    let getOrders = async () => {
      let resData = await axios.get(queryUrl, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      if (resData.data.length === 0){
        setOrdersAndDetails([])
      }

      if (resData.data.length > 0){
        for (let i = 0; i < resData.data.length; i++){ 
          let currentOrder = resData.data[i]
          // console.log('currentOrder: ', currentOrder)
          let currentObj = {}
          currentObj["createdAt"] = currentOrder.createdAt.split("T")[0]
          currentObj["productsAndQuantities"] = []
          currentObj["totalCost"] = currentOrder.totalCost

          let currentOrderItems = currentOrder.orderItems
          // console.log('currentOrder: ', currentOrder)
          for (let j = 0; j < currentOrderItems.length; j++){
            let currentItem = currentOrderItems[j]
          
            let queryUrl = productUrlBase + currentItem.product
            let newProductData = await axios.get(queryUrl, {
              headers: { Authorization: `Bearer ${currentToken}` },
            });
            newProductData.data["quantity"] = currentItem.quantity
            currentObj["productsAndQuantities"].push(newProductData.data)
          }
          ordersWithDetails.push(currentObj)
        }
        // console.log('ordersWithDetails: ', ordersWithDetails)
      }

      setOrdersAndDetails(ordersWithDetails);
    }
  
  getOrders()
  setIsLoading(false)
  }, []);


  return (
    <>
      <h2 style={{ display: 'flex', flexWrap: "wrap", justifyContent: 'center' }}>Orders</h2>

      {isLoading && <p>Loading...</p>}

      {ordersAndDetails && ordersAndDetails.length === 0 && <p>You have not placed any orders.</p>}
      {ordersAndDetails && ordersAndDetails.length > 0 && <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Products</th>
          <th>Total Cost</th>
        </tr>
      </thead>
      <tbody>
        {ordersAndDetails && ordersAndDetails.map((order, index) => {
          return <tr key={index}>
            <td>{ordersAndDetails.indexOf(order) + 1}</td>
            <td>{order.createdAt}</td>
            <td>{order.productsAndQuantities.map((product) => {
              return <p key={product._id}>{product.name} (${product.price / 100}.00) x{product.quantity}</p>
            })}</td>
            <td>${order.totalCost / 100}.00</td>
          </tr>
        })}
      </tbody>
    </Table>}
    
    </>
  );
}

export default Orders;
