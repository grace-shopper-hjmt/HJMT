import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser} from '../store/admin'

class SingleUser extends React.Component {
  componentDidMount() {
    this.props.fetchInitialUser(this.props.match.params.id)
  }

  render() {
    return <h2>Hello from a single user</h2>
  }
}

const mapState = state => ({admin: state.admin.selectedUser})

const mapDispatch = dispatch => {
  return {
    fetchInitialUser: userId => dispatch(fetchSingleUser(userId))
  }
}

export default connect(mapState, mapDispatch)(SingleUser)
