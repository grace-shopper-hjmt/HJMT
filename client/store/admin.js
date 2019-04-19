import axios from 'axios'
// import history from '../history'

//INITIAL STATE
const initialState = {
  allUsers: [],
  selectedUser: {}
}

//ACTION TYPES
const GET_USERS = 'GET_USERS'
const SELECT_USER = 'SELECT_USER'
// const EDIT_USER = 'EDIT_USER'
// const DELETE_USER = 'DELETE_USER'
// const PROMOTE_USER = 'PROMOTE_USER'

//ACTION CREATORS
const getUsers = users => ({type: GET_USERS, users})
const selectUser = userId => ({type: SELECT_USER, userId})
// const editUser = (userId, user) => ({type: EDIT_USER, userId, user})

//THUNK CREATORS
export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(getUsers(data))
    } catch (error) {
      console.log('ERROR fetching all users', error)
    }
  }
}

export const fetchSingleUser = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}`)
      dispatch(selectUser(data))
    } catch (err) {
      console.log('ERROR fetching that user', err)
    }
  }
}

// export const updateUser = (userId, user) => {
//   return async dispatch => {
//     try {
//       await axios.put(`/api/users/${userId}`, user)
//       dispatch(editUser(userId, user))
//     } catch (err) {
//       console.log('ERROR updating that user', err)
//     }
//   }
// }

//HANDLERS FOR REDUCER
const handlers = {
  [GET_USERS]: (state, action) => ({...state, allUsers: action.users}),
  [SELECT_USER]: (state, action) => ({...state, selectedUser: action.userId})
  // [EDIT_USER]: (state, action) => {
  //   if (state.selectedUser.id === action.id) {
  //     return {
  //       selectedUser: action.user,
  //       allUsers: state.allUsers
  //         .filter(user => user.id !== action.id)
  //         .push(action.user)
  //     }
  //   } else {
  //     return {
  //       ...state,
  //       allUsers: state.allUsers
  //         .filter(user => user.id !== action.id)
  //         .push(action.user)
  //     }
  //   }
  // }
}

//ADMIN REDUCER
export const adminReducer = (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action)
  }
  return state
}
