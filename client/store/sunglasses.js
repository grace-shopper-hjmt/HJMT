import axios from 'axios'
import history from '../history'

const initialState = {
  allSunglasses: [],
  selectedSunglasses: {}
}

//ACTION TYPES
const GET_ALL_SUNGLASSES = 'GET_ALL_SUNGLASSES'
const FILTER_SUNGLASSES = 'FILTER_SUNGLASSES'

//ACTION CREATORS
export const getAllSunglasses = sunglasses => ({
  type: GET_ALL_SUNGLASSES,
  sunglasses
})
export const filterSunglassses = (filter, filterType) => ({
  type: FILTER_SUNGLASSES,
  filter,
  filterType
})

//THUNK CREATORS
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

//HANDLERS
const handlers = {
  [GET_ALL_SUNGLASSES]: (state, action) => ({
    ...state,
    allSunglasses: action.sunglasses
  }),
  [FILTER_SUNGLASSES]: (state, action) => {
    const sunglasses = state.allSunglasses.filter(
      glasses => glasses[action.filterType] === action.filter
    )
    return { ...state, allSunglasses: sunglasses }
  }
}

export const sunglassesReducer = (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action)
  }

  return state
}
