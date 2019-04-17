import axios from 'axios'
import history from '../history'

const initialState = {
  allSunglasses: [],
  selectedSunglasses: {}
}

//ACTION TYPES
const GET_ALL_SUNGLASSES = 'GET_ALL_SUNGLASSES'
const EDIT_SUNGLASSES = 'EDIT_SUNGLASSES'

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

//HANDLERS FOR SUNGLASSES REDUCER
const handlers = {
  [GET_ALL_SUNGLASSES]: (state, action) => ({
    ...state,
    allSunglasses: action.sunglasses
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
