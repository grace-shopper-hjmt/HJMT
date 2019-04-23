import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleUser, thunkDeleteUser} from '../store/admin'
import Button from '@material-ui/core/Button'


class SingleUser extends React.Component {
  componentDidMount() {
    this.props.fetchInitialUser(this.props.match.params.id)
  }

  render() {
    const selectedUser = this.props.selectedUser
    return (
      <div>
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
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={() => this.props.thunkDeleteUser(this.props.match.params.id)}
        >
          Delete
        </Button>
        <Link to="/users">Back</Link>
        <h4>
          <Link to={`/users/${this.props.match.params.id}/edit`}>Edit</Link>
        </h4>
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
    fetchInitialUser: userId => dispatch(fetchSingleUser(userId)),
    thunkDeleteUser: newProps => {
      dispatch(thunkDeleteUser(newProps))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleUser)
