import axios from 'axios'
import history from '../history'

//INITIAL STATE
const defaultUser = {}

//ACTION TYPES
const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

//ACTION CREATORS
const loginUser = user => ({type: LOGIN_USER, user})
const logoutUser = () => ({type: LOGOUT_USER})

//THUNK CREATORS
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(loginUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(loginUser({error: authError}))
  }
  try {
    dispatch(loginUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(logoutUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

// HANDLERS FOR USERS REDUCER
const handlers = {
  [LOGIN_USER]: action => ({defaultUser: action.user}),
  [LOGOUT_USER]: () => ({defaultUser: {}})
}

export default function(state = defaultUser, action) {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action)
  }
  return state
}
