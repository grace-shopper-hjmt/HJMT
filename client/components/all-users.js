import React from 'react'
import {connect} from 'react-redux'

const AllUsers = props => {
  return <div>Hello from all users!</div>
}

const mapState = state => ({admin: state.admin})

export default connect(mapState)(AllUsers)
