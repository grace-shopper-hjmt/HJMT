import axios from 'axios'


const initialState = {
  allSunglasses: [],
  selectedSunglasses: {}
}


//ACTION TYPES
const GET_ALL_SUNGLASSES = 'GET_ALL_SUNGLASSES'
const EDIT_SUNGLASSES = 'EDIT_SUNGLASSES'
const DELETE_SUNGLASSES = 'DELETE_SUNGLASSES'
const ADD_SUNGLASSES = 'ADD_SUNGLASSES'

//ACTION CREATORS
export const getAllSunglasses = sunglasses => ({
  type: GET_ALL_SUNGLASSES,
  sunglasses
})
export const editSunglasses = (id, sunglasses) => ({
  type: EDIT_SUNGLASSES,
  id,
  sunglasses
})
export const deleteSunglasses = id => ({ type: DELETE_SUNGLASSES, id })
export const addSunglasses = (sunglasses) => ({type: ADD_SUNGLASSES, sunglasses})


//THUNKS
export const fetchSunglasses = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/sunglasses')
      dispatch(getAllSunglasses(data))
    } catch (error) {
      console.log('ERROR FETCHING SUNGLASSES', error)
    }
  }
}

export const updateSunglasses = (id, sunglasses) => {
  return async dispatch => {
    try {
      await axios.put(`/api/sunglasses/${id}`, sunglasses)
      dispatch(editSunglasses(id, sunglasses))
    } catch (err) {
      console.log('ERROR updating those sunglasses', err)
    }
  }
}

export const thunkAddSunglasses = (sunglasses, ownProps) => {
  return async dispatch => {
      try {
          const { data } = await axios.post('/api/sunglasses', sunglasses)
        dispatch(addSunglasses(data))
        ownProps.history.push(`/sunglasses/${sunglasses.id}`)
      } catch (error) {
         console.log('ERROR ADDING SUNGLASSES', error)
      }
  }
 }

export const thunkDeleteSunglasses = (id, ownProps) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/sunglasses/${id}`)
      dispatch(deleteSunglasses(id))
      ownProps.history.push(`/sunglasses`)
    } catch (error) {
      console.log('Cannot remove sunglasses', error)
    }
  }
}

//HANDLERS FOR SUNGLASSES REDUCER
const handlers = {
  [GET_ALL_SUNGLASSES]: (state, action) => ({
    ...state,
    allSunglasses: action.sunglasses
  }),
  [ADD_SUNGLASSES]:(state, action) => ({...state, allSunglasses:[...state.allSunglasses, action.sunglasses]}),
  [DELETE_SUNGLASSES]: (state, action) => ({
    ...state,
    selectedSunglasses: {},
    allSunglasses: state.allSunglasses.filter(
      sunglasses => sunglasses.id !== action.id
    )
  }),
  [EDIT_SUNGLASSES]: (state, action) => {
    if (state.selectedSunglasses.id === action.id) {
      return {
        selectedSunglasses: action.sunglasses,
        allSunglasses: state.allSunglasses
          .filter(sunglasses => sunglasses.id !== action.id)
          .push(action.sunglasses)
      }
    } else {
      return {
        ...state,
        allSunglasses: state.allSunglasses
          .filter(sunglasses => sunglasses.id !== action.id)
          .push(action.sunglasses)
      }
    }
  }
}

export const sunglassesReducer = (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action)
  }
  return state
}
