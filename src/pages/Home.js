import React from 'react'

function Home() {

  return (
    <div>
      <p><b>IMPORTANT</b>: this site is meant to be a portfolio project, and not an active ecommerce store. If you proceed to the "Products" page, you can browse products and add items to your cart. After you add items to your cart and proceed to checkout, you will be asked to enter a credit card number, address, etc. <b>PLEASE</b> enter the number "4242 4242 4242 4242" for the credit card, as this number lets the user proceed but is recognized as fake by the payment service software I am using. No actual money will be spent. For the address, you can add any random street address. Likewise, for the credit card expiration date, please enter any date in the future for the MM/YY field, like 03/27. Thank you for your cooperation.</p>
      <p>You will be able to browse products once you sign up for an account. Lastly, the free cloud hosting service I am using for my server may take 20-30 seconds to reboot after prolonge inactivity, so do not be alarmed by some initial lag.</p>
    </div>
  )
}

export default Home
