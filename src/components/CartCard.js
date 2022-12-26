import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function CartCard({ productId, quantity, currentToken }) {
  const [productData, setProductData] = useState();

  useEffect(() => {
    let getProductAndQuantity = async () => {
      // let baseURL = "http://localhost:4000/"
      let baseURL = "https://store-backend-arv3.onrender.com/";
      let queryUrl = baseURL + "api/products/single/" + productId;

      let newProductData = await axios.get(queryUrl, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      console.log("newProductData.data: ", newProductData.data);

      setProductData(newProductData.data);
    };

    getProductAndQuantity();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
        {productData && (
          <>
            <Card style={{ minWidth: "18rem", width: "35rem", marginBottom: "10px", marginTop: "10px" }}>
              <Card.Img variant="top" src={productData.image} />
              <Card.Body>
                <Card.Title>{productData.brand}: {productData.name}</Card.Title>
                <Card.Text>Unit price: ${productData.price / 100}.00</Card.Text>
                <Card.Text>Quantity: {quantity}</Card.Text>
              </Card.Body>
            </Card>
          </>
        )}
    </div>
  );
}

export default CartCard;
