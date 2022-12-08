import React from "react";
import axios from "axios";

function ProductCard({ productData, currentUserId, currentToken }) {

  let handleAddToCart = async (productData) => {
    // console.log("id of item added to cart: ", productData._id);
    // console.log("current user's id: ", currentUserId);

    // check if there is a cart for given user
    let cartExistsUrl = "http://localhost:4000/" + "api/cart/read-cart/" + currentUserId;
    let resData = await axios.get(cartExistsUrl, {
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    // works down to here
    
    console.log('productData: ', productData)
    console.log('resData: ', resData)

    if (resData.data[0]) {
      // console.log("cart exists: ", resData.data[0]);

      // if current product already in cart, increment quantity by 1
      for (let i = 0; i < resData.data[0].cartItems.length; i++){
        let currentObj = resData.data[0].cartItems[i]
        let hasProduct = Object.values(currentObj).includes(productData._id)
        if (hasProduct){
          console.log('clicked product already in cart')
          let currentDbCartItems = resData.data[0].cartItems
          for (let i = 0; i < currentDbCartItems.length; i++){
            let currentObj = currentDbCartItems[i]
            if (currentObj['product'] === productData._id){
              currentObj['quantity'] += 1 
            }
          }
          console.log('updated resData before posting to db: ', resData)
          // works to here 

          let cartId = resData.data[0]._id
          let updateCartUrl = "http://localhost:4000/" + "api/cart/update-cart/" + cartId
          let updatedCartData = await axios.put(updateCartUrl, resData.data[0], {
            headers: { Authorization: `Bearer ${currentToken}` },
          });

          console.log('updatedCartData: ', updatedCartData)

        } else {
          console.log('clicked product not in cart')
        }
      }
  

      // else if current product not in cart, add current product to cart with quantity of 1

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

  // let updateCart = ...
  // let createNewCart = ...

  

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
