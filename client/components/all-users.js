import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import {thunkDeleteUser} from '../store/user'

const AllUsers = props => {
  console.log('props', props.admin.allUsers)
  return (
    <div>
      All users:
      <h3>
        {props.admin.allUsers.map(user => {
          return (
            <div key={user.id}>
              <Link to={`/users/${user.id}`}>
                <span>{user.email}</span>
              </Link>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={() => props.thunkDeleteUser(user.id)}
              >
                Delete
              </Button>
            </div>
          )
        })}
      </h3>
    </div>
  )
}

const mapState = state => ({admin: state.admin})

const mapDispatch = (dispatch) => {
  return {
    thunkDeleteUser: newProps => {
      dispatch(thunkDeleteUser(newProps))
    }
  }
}
export default connect(mapState, mapDispatch)(AllUsers)
