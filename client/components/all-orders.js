import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const AllOrders = props => {
  const orders = props.orders
  return (
    <div className='allorders'>
      <div>ALL ORDERS</div>
      <div>
        {orders.allOrders.map(order => (
          <div key={order.id}>
            <Link to={`/orders/${order.id}`}>
            <h3>Name: {order.name}</h3>
            <img  src={order.imageUrl} />
            </Link>
            <h3>Price: {order.price}</h3>
            <h3>Quantity: {order.quantity}</h3>
            <h3>Order Status: {order.status}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

const mapState = state => ({orders: state.orders})

export default connect(mapState)(AllOrders)
