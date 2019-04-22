import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  console.log('props', props)
  const {id,name, email, billingAddress, shippingAddress} = props
  return (
    <div>
      <h3>Welcome, {email}!</h3>
      <h4>Account Info:</h4>
      <h4>Name:{name}</h4>
      <h5>Email: {email}</h5>
      <h5>Billing Address:{billingAddress}</h5>
      <h5>Shipping Address:{shippingAddress}</h5>
      <Link to='/sunglasses'>Let's go shopping!</Link>
     <h4> <Link to='/home/edit'>Edit</Link></h4>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.user.name,
    id: state.user.id,
    email: state.user.email,
    billingAddress: state.user.billingAddress,
    shippingAddress: state.user.shippingAddress,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
