import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {name} = props
  return (
      <div>This is a business conducted in a shady area......
    <div className='home'>
      <h1>Welcome To Shady Business, {name}!</h1>
      <Link to='/sunglasses'>Let's go shopping!🛍️</Link>
    </div>
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
