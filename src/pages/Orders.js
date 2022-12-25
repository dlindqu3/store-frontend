import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderCard from "../components/OrderCard";

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
        setOrders(resData.data)
        // console.log("orders resData.data: ", resData.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    getOrders();
  }, []);

  return (
    <div>
      {!orders[0] && <p>Your have not placed any orders.</p>}
      {orders && orders.map((order) => {
        return <OrderCard key={order._id} currentToken={currentToken} orderData={order}/>
      }) }
    </div>
  );
}

export default Orders;
