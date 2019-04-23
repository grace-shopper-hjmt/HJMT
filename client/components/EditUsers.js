import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { updateUser } from '../store/admin'


class DisconnectedEditUsers extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      billingAddress: '',
      shippingAddress: '',
      warning: 'Field is required'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const userId = this.props.match.params.id
    this.props.updateUser(userId)
    this.setState({
      name: this.props.users.name,
      email: this.props.users.email,
      billingAddress: this.props.users.billingAddress,
      shippingAddress: this.props.users.shippingAddress,
    })
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    try {
      this.props.updateUser({...this.state} )
    } catch (error) {
      console.error('Cannot submit the form')
    }
  }

  render() {
    const {name,email,billingAddress, shippingAddress, warning} = this.state
    return (
      <div>
        <main>
          <h1>Edit yourself here!</h1>

          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              {!name && warning && <span className="warning">{warning}</span>}
              <input
                onChange={this.handleChange}
                name="name"
                type="text"
                value={name}
              />
            </label>

            <label>
              Email:
              {!email && warning && <span className="warning">{warning}</span>}
              <input
                onChange={this.handleChange}
                name="email"
                type="text"
                value={email}
              />
            </label>

            <label>
              BillingAddress:
              <input
                onChange={this.handleChange}
                name="billingAddress"
                type="text"
                value={billingAddress}
              />
            </label>


            <label>
              ShippingAddress:
              <input
                onChange={this.handleChange}
                name="shippingAddress"
                type="text"
                value={shippingAddress}
              />
            </label>
            <button type="submit">Submit</button>
          </form>

          <h4>
            <Link to="/users">Back</Link>
          </h4>
        </main>
      </div>
    )
  }
}

const mapState = state => {
  return {
    users:state.users.selectedUser
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    updateUser: updatedUsers => {
      dispatch(updateUser(updatedUsers, ownProps.match.params.id, ownProps))
    },
    // fetchCurrentSunglasses: sunglasses => {
    //   dispatch(fetchOneSunglasses(sunglasses))
    // }
  }
}

export const EditUsers =  withRouter(connect(mapState, mapDispatch)(DisconnectedEditUsers))
