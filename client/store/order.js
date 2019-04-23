import axios from 'axios'

//INITIAL STATE
const initialState = {
  allOrders: [],
  selectedOrder: {},
  statuses: [],
  filteredOrders: [],
  activeStatuses: []
}

//ACTION TYPES
const GET_ORDERS = 'GET_ORDERS'
const SELECT_ORDER = 'SELECT_ORDER'
const EDIT_ORDER = 'EDIT_ORDER'
const DELETE_ORDER = 'DELETE_ORDER'

//ACTION CREATORS
const getOrders = orders => ({type: GET_ORDERS, orders})
const selectOrder = orderId => ({type: SELECT_ORDER, orderId})
const editOrder = (orderId, order) => ({type: EDIT_ORDER, orderId, order})
const deleteOrder = orderId => ({type: DELETE_ORDER, orderId})

//THUNK CREATORS
export const fetchOrders = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders')
      dispatch(getOrders(data))
    } catch (error) {
      console.log('ERROR FETCHING ALL ORDERS', error)
    }
  }
}

export const fetchSingleOrder = orderId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/${orderId}`)
      dispatch(selectOrder(data))
    } catch (error) {
      console.log('ERROR FETCHING THAT ORDER', error)
    }
  }
}

export const updateOrder = (order, orderId, ownProps) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/orders/${orderId}`, order)
      dispatch(editOrder(data))
      ownProps.history.push(`/order/${orderId}`)
    } catch (error) {
      console.log('error updating that order', error)
    }
  }
}

export const destroyOrder = (orderId, ownProps) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/orders/${orderId}`)
      dispatch(deleteOrder(orderId))
      ownProps.history.push('/order')
    } catch (error) {
      console.log('ERROR DELETING THAT ORDER', error)
    }
  }
}

//HANDLERS FOR REDUCER
const handlers = {
  [GET_ORDERS]: (state, action) => ({...state, allOrders: action.orders}),
  [SELECT_ORDER]: (state, action) => ({
    ...state,
    selectedOrder: action.orderId
  }),
  [EDIT_ORDER]: (state, action) => {
    if (state.selectedOrder.id === Number(action.orderId)) {
      return {
        selectedOrder: action.order,
        allOrders: state.allOrders
          .filter(order => order.id !== Number(action.orderId))
          .push(action.order)
      }
    } else {
      return {
        ...state,
        allOrders: state.allOrders
          .filter(order => order.id !== Number(action.orderId))
          .push(action.order)
      }
    }
  },
  [DELETE_ORDER]: (state, action) => ({
    ...state,
    selectedOrder: {},
    allOrders: state.allOrders.filter(
      order => order.id !== Number(action.orderId)
    )
  })
}

//ADMIN REDUCER
export const ordersReducer = (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action)
  }
  return state
}
