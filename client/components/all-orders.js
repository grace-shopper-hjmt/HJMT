import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrders} from '../store/order'

const AllOrders = props => {
  const orders = props.orders
  return <div>ALL ORDERS!</div>
}

const mapDispatch = dispatch => {
  return {
    fetchOrders: () => dispatch(fetchOrders())
  }
}

export default connect(null, mapDispatch)(AllOrders)
