import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleOrder} from '../store/order'
// import {AUTHFUNC} from '../auth-functions'

class SingleOrder extends React.Component {
  componentDidMount() {
    this.props.fetchInitialOrder(this.props.match.params.id)
  }

  render() {
    const selectedOrder = this.props.selectedOrder
    return (
      <div>
        {selectedOrder.id ? (
          <div>
            <h3>Name{selectedOrder.name}</h3>
            <h3>quantity: {selectedOrder.quantity}</h3>
            <h3>price: {selectedOrder.price}</h3>
            <h3>status:{selectedOrder.status}</h3>
          </div>
        ) : (
          <div>No selectedOrder info</div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  selectedOrder: state.orders.selectedOrder,
  orders: state.order
})

const mapDispatch = dispatch => {
  return {
    fetchInitialOrder: orderId => dispatch(fetchSingleOrder(orderId))
  }
}

export default connect(mapState, mapDispatch)(SingleOrder)
