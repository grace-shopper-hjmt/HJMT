import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const AllOrders = props => {
  const orders = props.orders
  console.log('ORDERS PROPS', orders)
  return <div>ALL ORDERS!</div>
}

const mpaState = state => ({orders: state.orders})

export default connect(mpaState)(AllOrders)
