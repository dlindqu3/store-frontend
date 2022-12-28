import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";


function Orders({ currentUser, currentToken, currentEmail, currentUserId }) {
  
  const [orders, setOrders] = useState()
  const [productsQuants, setProductsQuants] = useState()


  let baseURL = "https://store-backend-arv3.onrender.com/";
  let queryUrl = baseURL + "api/orders/get-single-user-orders/" + currentUserId;
  let productUrlBase = baseURL + "api/products/single/"

  useEffect(() => {
    let getOrders = async () => {
      let resData = await axios.get(queryUrl, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      setOrders(resData.data);
    }
      
  getOrders();
  }, []);

  let handleViewProducts = (orderItems) => {
    for (let i = 0; i < orderItems.length; i++){
      console.log(orderItems[i])
    }
  }

  let handleGetDetails = async (order) =>{

    // setProductsQuants(null)
    // let productsAndQuants = []
    
    // for (let i = 0; i < order.orderItems.length; i++){
    //   let obj = {}
    //   let currentItem = order.orderItems[i]
    //   obj["productId"] = currentItem.product
    //   obj["quantity"] = currentItem.quantity
    //   productsAndQuants.push(obj)
    // }
    
    // for (let i = 0; i < productsAndQuants.length; i++){
    //   let currentItem = productsAndQuants[i]
    //   let currentId = currentItem.productId
    //   let productUrl = productUrlBase + currentId
    //   let newProductData = await axios.get(productUrl, {
    //     headers: { Authorization: `Bearer ${currentToken}` },
    //   });
    //   currentItem["details"] = newProductData.data
    // }
    // console.log('productsAndQuants: ', productsAndQuants)
    // setProductsQuants(productsAndQuants)
  }


  return (
    <>
      {<h2 style={{ display: 'flex', flexWrap: "wrap", justifyContent: 'center' }}>Your Orders</h2>}
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Products</th>
          <th>Total Cost</th>
        </tr>
      </thead>

      <tbody>
      { orders && orders.map((item) => {
          return <tr key={item._id}>
                <td>{orders.indexOf(item) + 1}</td>
                <td>{item.createdAt.split("T")[0]}</td>
                <td>Order id: {item._id}</td>
                <td>Total cost: ${item.totalCost / 100}.00</td>
          </tr> 
        })}
      </tbody>
    </Table>
    {productsQuants && <p>{productsQuants[productsQuants.length - 1].productId}</p>}
    </>
  );
}

export default Orders;
