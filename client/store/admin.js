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

//ACTION CREATORS
const getUsers = users => ({type: GET_USERS, users})
const selectUser = userId => ({type: SELECT_USER, userId})

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
      console.log('ERROR fetching single user', err)
    }
  }
}

//HANDLERS FOR REDUCER
const handlers = {
  [GET_USERS]: (state, action) => ({...state, allUsers: action.users}),
  [SELECT_USER]: (state, action) => ({...state, selectedUser: action.userId})
}

//ADMIN REDUCER
export const adminReducer = (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action)
  }
  return state
}
