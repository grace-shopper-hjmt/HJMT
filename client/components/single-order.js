import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleOrder} from '../store/order'
// import {AUTHFUNC} from '../auth-functions'

class SingleOrder extends React.Component {
  componentDidMount() {
    this.props.fetchSingleOrder(this.props.match.params.id)
  }

  render() {
    const selectedOrder = this.props.selectedOrder
    return <div>SINGLE ORDER</div>
  }
}

const mapState = state => ({
  selectedOrder: state.orders.selectedOrder
})

const mapDispatch = dispatch => {
  return {
    fetchSingleOrder: orderId => dispatch(fetchSingleOrder(orderId))
  }
}

export default connect(mapState, mapDispatch)(SingleOrder)
