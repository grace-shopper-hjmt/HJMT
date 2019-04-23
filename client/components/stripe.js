import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout';
 

export default class PaymentForm extends React.Component {

  onToken = async (token) => {
    await axios.post('/api/stripe/charge', {token: token})
    this.props.placeOrder()
  }
 
  render() {
    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_7azFEBsWo30IOrlhmtvsQrhP00EuKwSlDb"
      />
    )
  }
}