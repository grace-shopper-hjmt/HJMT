import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'


const AllUsers = props => {
  return (
    <div className='all-users'>
    <div className='users-view'>
      <h3>
        {props.admin.allUsers.map(user => {
          return (
            <div key={user.id} className='user-card'>
              <Link to={`/users/${user.id}`}>
                <span>{user.id}.{user.email}</span>
              </Link>
            </div>
          )
        })}
        </h3>
    </div>
    </div>
  )
}

const mapState = state => ({admin: state.admin})


export default connect(mapState)(AllUsers)
