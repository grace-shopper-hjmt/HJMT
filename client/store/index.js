import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './user'
import {sunglassesReducer} from '../store/sunglasses'
import {adminReducer} from './admin'

const reducer = combineReducers({
  user: userReducer,
  sunglasses: sunglassesReducer,
  admin: adminReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store
export * from './user'
