import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
// //INITIAL STATE
// const defaultUser = {}

// //ACTION TYPES
// const LOGIN_USER = 'LOGIN_USER'
// const LOGOUT_USER = 'LOGOUT_USER'

// //ACTION CREATORS
// const loginUser = user => ({type: LOGIN_USER, user})
// const logoutUser = () => ({type: LOGOUT_USER})

// //THUNK CREATORS
// export const me = () => async dispatch => {
//   try {
//     const res = await axios.get('/auth/me')
//     dispatch(loginUser(res.data || defaultUser))
//   } catch (err) {
//     console.error(err)
//   }
// }

// export const auth = (email, password, method) => async dispatch => {
//   let res
//   try {
//     res = await axios.post(`/auth/${method}`, {email, password})
//   } catch (authError) {
//     return dispatch(loginUser({error: authError}))
//   }
//   try {
//     dispatch(loginUser(res.data))
//     history.push('/home')
//   } catch (dispatchOrHistoryErr) {
//     console.error(dispatchOrHistoryErr)
//   }
// }

// export const logout = () => async dispatch => {
//   try {
//     await axios.post('/auth/logout')
//     dispatch(logoutUser())
//     history.push('/login')
//   } catch (err) {
//     console.error(err)
//   }
// }

// //HANDLERS FOR USERS REDUCER
// // const handlers = {
// //   [LOGIN_USER]: action => ({defaultUser: action.user}),
// //   [LOGOUT_USER]: () => ({defaultUser: {}})
// // }

// //OLD SWTICH REDUCER FUNCTION
// export const usersReducer = (state = defaultUser, action) => {
//   switch (action.type) {
//     case LOGIN_USER:
//       return action.user
//     case LOGOUT_USER:
//       return defaultUser
//     default:
//       return state
//   }
// }

// export const usersReducer = (state = defaultUser, action) => {
//   if (handlers.hasOwnProperty(action.type)) {
//     return handlers[action.type](state, action)
//   }
//   return state
// }
