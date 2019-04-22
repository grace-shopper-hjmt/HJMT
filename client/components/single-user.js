import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchSingleUser } from '../store/admin'
import {isAdmin } from '../util'

class SingleUser extends React.Component {
  componentDidMount() {
    this.props.fetchInitialUser(this.props.match.params.id)
  }

  render() {
    const selectedUser = this.props.selectedUser
    console.log('props', this.props.user)
    return (
      <div>
        <div>
          {isAdmin(this.props)? 'hello' : 'goodbye'}
          </div>
        Account info and history:
        {selectedUser.id ? (
          <div>
            <div>
              Orders:
              {selectedUser.orders.map(order => (
                <div key={order.id}>
                  <h3>Item id:{order.id}</h3>
                  <h3>quantity: {order.quantity}</h3>
                  <h3>price: {order.price}</h3>
                  <h3>status:{order.status}</h3>
                </div>
              ))}
            </div>
            <div>
              Reviews:
              {selectedUser.reviews.map(review => (
                <div key={review.id}>
                  <h3>content: {review.content}</h3>
                  <h3>rating: {review.rating}</h3>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>No selectedUser info</div>
        )}
        <Link to="/users">Back</Link>
      </div>
    )
  }
}

const mapState = state => ({
  selectedUser: state.admin.selectedUser,
  user: state.user
})

const mapDispatch = dispatch => {
  return {
    fetchInitialUser: userId => dispatch(fetchSingleUser(userId))
  }
}

export default connect(mapState, mapDispatch)(SingleUser)
