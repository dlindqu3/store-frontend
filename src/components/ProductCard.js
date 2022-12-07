import React from "react";
import axios from "axios";

function ProductCard({ productData, currentUserId, currentToken }) {
  let handleAddToCart = async (productData) => {
    console.log("id of item added to cart: ", productData._id);
    console.log("current user's id: ", currentUserId);
    // works down to here

    // check if there is a cart for given user
    let cartExistsUrl =
      "http://localhost:4000/" + "api/cart/read-cart/" + currentUserId;
    let resData = await axios.get(cartExistsUrl, {
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    if (resData.data[0]) {
      console.log("cart exists: ", resData.data[0]);
      // if cart exists, update cart to contain current product
    } else {
      console.log("cart does not exist");
      // if no cart, create one with current product
      let createCartUrl = "http://localhost:4000/" + "api/cart/create-cart/";
      let createCartBody = {
        user: currentUserId,
        cartItems: [
          {
            product: productData._id,
            quantity: 1,
          },
        ],
      };
      let createdCart = await axios.post(createCartUrl, createCartBody, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      console.log('createdCart: ', createdCart)
    }
  };

  return (
    <div>
      <p>{productData["name"]}</p>
      <img src={productData.image} alt="bike" width="200" height="175" />
      <button
        onClick={() => {
          handleAddToCart(productData);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;

// cart schema:
// {
//   // user that is the purchaser
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "User"
//   },
//   cartItems: [
//     {
//       product: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: "Product"
//       },
//        quantity: {
//         type: Number,
//         required: true
//       }
//     }
//   ]
// }
