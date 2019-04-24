import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleOrder, destroyOrder} from '../store/order'
import Button from '@material-ui/core/Button'

// import {AUTHFUNC} from '../auth-functions'

class SingleOrder extends React.Component {
  componentDidMount() {
    this.props.fetchInitialOrder(this.props.match.params.id)
  }

  render() {
    const selectedOrder = this.props.selectedOrder
    return (
      <div className='singleFormContainer'>
      <div className='singleForm'>
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
        <h3>
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={() => this.props.deleteOrder(this.props.selectedOrder.id)}
          >
            Delete
          </Button>
          </h3>
          <Link to="/orders">Back</Link>
          </div>
      </div>
    )
  }
}

const mapState = state => ({
  selectedOrder: state.orders.selectedOrder,
  orders: state.order
})

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchInitialOrder: orderId => {
      dispatch(fetchSingleOrder(orderId))
    },
    deleteOrder: newProps => {
      dispatch(destroyOrder(newProps, ownProps))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleOrder)
