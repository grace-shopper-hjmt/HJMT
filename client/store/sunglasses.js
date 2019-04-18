import axios from 'axios'

const initialState = {
  allSunglasses: [],
  selectedSunglasses: {},
  categories: [],
  filteredSunglasses: []
}

//ACTION TYPES
const GET_ALL_SUNGLASSES = 'GET_ALL_SUNGLASSES'
const SELECT_SUNGLASSES = 'SELECT_SUNGLASSES'
const EDIT_SUNGLASSES = 'EDIT_SUNGLASSES'
const DELETE_SUNGLASSES = 'DELETE_SUNGLASSES'
const ADD_SUNGLASSES = 'ADD_SUNGLASSES'
const GET_CATEGORIES = 'GET_CATEGORIES'
const PRICE_FILTER = 'PRICE_FILTER'
const REMOVE_PRICE_FILTER = 'REMOVE_PRICE_FILTER'
const REMOVE_ALL_FILTERS = 'REMOVE_ALL_FILTERS'

//HELPER FUNCTIONS
const sortByPrice = (a, b) => {
  return a.price - b.price
}

//ACTION CREATORS
export const removePriceFilter = (min, max) => ({
  type: REMOVE_PRICE_FILTER,
  min,
  max
})
export const removeAllFilters = () => ({type: REMOVE_ALL_FILTERS})
export const filterByPrice = (min, max) => ({type: PRICE_FILTER, min, max})
export const getAllSunglasses = sunglasses => ({
  type: GET_ALL_SUNGLASSES,
  sunglasses
})
export const selectSunglasses = sunglassesId => ({
  type: SELECT_SUNGLASSES,
  sunglassesId
})
export const editSunglasses = (id, sunglasses) => ({
  type: EDIT_SUNGLASSES,
  id,
  sunglasses
})
export const deleteSunglasses = id => ({type: DELETE_SUNGLASSES, id})
export const addSunglasses = sunglasses => ({type: ADD_SUNGLASSES, sunglasses})
export const getCategories = categories => ({type: GET_CATEGORIES, categories})
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

export const fetchOneSunglasses = sunglasses => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/sunglasses/${sunglasses}`)
      dispatch(selectSunglasses(data))
    } catch (error) {
      console.log('Cannot get this pair of sunglasses!')
    }
  }
}

export const updateSunglasses = (sunglasses, id, ownProps) => {
  return async dispatch => {
    try {
     const {data}= await axios.put(`/api/sunglasses/${id}`, sunglasses)
      dispatch(editSunglasses(data))
      ownProps.history.push(`/sunglasses/${id}`)

    } catch (err) {
      console.log('ERROR updating those sunglasses', err)
    }
  }
}

export const thunkAddSunglasses = (sunglasses, ownProps) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/sunglasses', sunglasses)
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

export const fetchCategories = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/sunglasses/categories')
      dispatch(getCategories(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//HANDLERS FOR SUNGLASSES REDUCER
const handlers = {
  [GET_ALL_SUNGLASSES]: (state, action) => ({
    ...state,
    allSunglasses: action.sunglasses.sort(sortByPrice)
  }),
  [ADD_SUNGLASSES]: (state, action) => ({
    ...state,
    allSunglasses: [...state.allSunglasses, action.sunglasses]
  }),
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
  },
  [SELECT_SUNGLASSES]: (state, action) => ({
    ...state,
    selectedSunglasses: action.sunglassesId
  }),
  [GET_CATEGORIES]: (state, action) => ({
    ...state,
    categories: action.categories
  }),
  [PRICE_FILTER]: (state, action) => {
    const priceCheck = sunglass => {
      if (
        sunglass.price / 100 >= Number(action.min) &&
        sunglass.price / 100 <= Number(action.max)
      ) {
        return true
      }
    }
    return {
      ...state,
      filteredSunglasses: [...state.filteredSunglasses]
        .concat(state.allSunglasses.filter(priceCheck))
        .sort(sortByPrice)
    }
  },
  [REMOVE_PRICE_FILTER]: (state, action) => {
    const priceCheck = sunglass => {
      if (
        sunglass.price / 100 < Number(action.min) ||
        sunglass.price / 100 > Number(action.max)
      ) {
        return true
      }
    }
    const sunglasses = state.filteredSunglasses.filter(priceCheck)
    return {
      ...state,
      filteredSunglasses: sunglasses.sort(sortByPrice)
    }
  },
  [REMOVE_ALL_FILTERS]: (state, action) => ({...state, filteredSunglasses: []})
}

export const sunglassesReducer = (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action)
  }
  return state
}
