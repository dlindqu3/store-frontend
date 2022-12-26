import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
// import OrderCard from "../components/OrderCard";

function Orders({ currentUser, currentToken, currentEmail, currentUserId }) {
  
  const [orders, setOrders] = useState();

  let baseURL = "https://store-backend-arv3.onrender.com/";
  let queryUrl = baseURL + "api/orders/get-single-user-orders/" + currentUserId;

  useEffect(() => {
    //Runs only on the first render
    let getOrders = async () => {
      try {
        let resData = await axios.get(queryUrl, {
          headers: { Authorization: `Bearer ${currentToken}` },
        });
        // this sets orders state to an array of all orders for the current user in the db
        setOrders(resData.data);
        // console.log("orders resData.data: ", resData.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    getOrders();
  }, []);

  let handleViewProducts = (orderItems) => {
    for (let i = 0; i < orderItems.length; i++){
      console.log(orderItems[i])
    }
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
                <td><Button onClick={() => {handleViewProducts(item.orderItems)}} style={{ marginLeft: "1px" }}>View Products</Button></td>
                <td>Total cost: ${item.totalCost / 100}.00</td>
          </tr> 
        })}
      </tbody>
    </Table>
    </>
  );
}

export default Orders;
