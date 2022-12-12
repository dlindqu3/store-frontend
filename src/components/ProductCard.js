import React from "react";
import axios from "axios";

function ProductCard({ productData, currentUserId, currentToken }) {

  let handleAddToCart = async (productData) => {

    // check if there is a cart for given user
    let cartExistsUrl = "http://localhost:4000/" + "api/cart/read-cart/" + currentUserId;
    let cartData = await axios.get(cartExistsUrl, {
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    
    console.log('productData: ', productData)
    console.log('cartData: ', cartData)

    if (!cartData.data[0]){

      console.log('there is no cart')
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


    } else if (cartData.data[0]) {
      console.log('there is a cart')
      console.log('cartItems: ', cartData.data[0].cartItems)
 
      let currentProductInCart = false; 
      let existingProductIdx; 

      for (let i = 0; i < cartData.data[0].cartItems.length; i++){
        let currentObj = cartData.data[0].cartItems[i]
        let hasProduct = Object.values(currentObj).includes(productData._id)
        if (hasProduct){
          currentProductInCart = true
          existingProductIdx = i; 
          console.log('currentObj with product that is in cart: ', currentObj)
        }
      }
      // console.log('currentProductInCart: ', currentProductInCart)

      // if current product is in cart, increment its quantity by 1
      if (currentProductInCart){
        cartData.data[0].cartItems[existingProductIdx].quantity += 1

          let cartId = cartData.data[0]._id
          let updateCartUrl = "http://localhost:4000/" + "api/cart/update-cart/" + cartId
         
          let updatedCartData = await axios.patch(updateCartUrl, cartData.data[0], {
            headers: { Authorization: `Bearer ${currentToken}` },
          });

          console.log('updatedCartData: ', updatedCartData)

      }
      

      // if current product is not in cart, add it to cart with quantity of 1
      if (!currentProductInCart){
        
        console.log('cart exists, but clicked product not in cart')
        
        let newItem = {
          product: productData._id,
          quantity: 1,
        }
        cartData.data[0].cartItems.push(newItem)
        
        let cartId = cartData.data[0]._id
        let updateCartUrl = "http://localhost:4000/" + "api/cart/update-cart/" + cartId

        let updatedCartData = await axios.patch(updateCartUrl, cartData.data[0], {
          headers: { Authorization: `Bearer ${currentToken}` },
        });


        console.log('updated cart Data after new item added: ', updatedCartData)
      
      } 

    }
}
  

  return (
    <div>
      <p>{productData["name"]}</p>
      <img src={productData.image} alt={productData.name} width="200" height="175" />
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
