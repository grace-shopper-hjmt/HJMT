import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const AllUsers = props => {
  console.log('state', props)
  return (
    <div>All users:
      <h3>{props.admin.allUsers.map(user => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>
            <span>{user.email}</span>
            </Link>
          </div>
       ) )}</h3>

    </div>

  )
}

const mapState = state => ({admin: state.admin})

export default connect(mapState)(AllUsers)
