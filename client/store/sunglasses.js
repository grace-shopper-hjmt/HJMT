import axios from 'axios'

const initialState = {
  allSunglasses: [],
  selectedSunglasses: {},
  categories: [],
  filteredSunglasses: [],
  activeFilters: []
}

//ACTION TYPES
const GET_ALL_SUNGLASSES = 'GET_ALL_SUNGLASSES'
const SELECT_SUNGLASSES = 'SELECT_SUNGLASSES'
const EDIT_SUNGLASSES = 'EDIT_SUNGLASSES'
const DELETE_SUNGLASSES = 'DELETE_SUNGLASSES'
const ADD_SUNGLASSES = 'ADD_SUNGLASSES'
const GET_CATEGORIES = 'GET_CATEGORIES'
const REMOVE_ALL_FILTERS = 'REMOVE_ALL_FILTERS'
const SET_FILTER = 'SET_FILTER'
const REMOVE_FILTER = 'REMOVE_FILTER'
const ADD_CATEGORY = 'ADD_CATEGORY'

//HELPER FUNCTIONS
const sortByPrice = (a, b) => {
  return a.price - b.price
}
const categoryFilter = (sunglasses, filters) => {
  let filteredSunglasses = []
  for (let i = 0; i < sunglasses.length; i++) {
    //let filterCount = 0
    let currentSunglasses = sunglasses[i]
    for (let j = 0; j < currentSunglasses.categories.length; j++) {
      const currentSunglassesCategories = currentSunglasses.categories[j]
      for (let k = 0; k < filters.length; k++) {
        // if (currentSunglassesCategories.name === filters[k]) {
        //   filterCount++
        // }
        if (
          currentSunglassesCategories.name === filters[k] && !filteredSunglasses.includes(currentSunglasses)
        ) {
          filteredSunglasses.push(currentSunglasses)
          break
        }
      }
    }
  }
  return filteredSunglasses
}

//ACTION CREATORS
export const addCategory = category => ({type: ADD_CATEGORY, category})
export const removeFilter = filterType => ({type: REMOVE_FILTER, filterType})
export const setFilter = filterType => ({
  type: SET_FILTER,
  filterType
})
export const removeAllFilters = () => ({type: REMOVE_ALL_FILTERS})
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
export const dbAddCategory = category => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/categories', category)
      dispatch(addCategory(data))
    } catch (error) {
      console.log('ERROR CREATING CATEGORY', error)
    }
  }
}
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
      const {data} = await axios.put(`/api/sunglasses/${id}`, sunglasses)
      dispatch(editSunglasses(id, data.updatedSunglasses))
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
      ownProps.history.push(`/sunglasses/${data.id}`)
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
      const {data} = await axios.get('/api/categories')
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
    allSunglasses: action.sunglasses.sort(sortByPrice),
    filteredSunglasses: action.sunglasses.sort(sortByPrice)
  }),
  [ADD_SUNGLASSES]: (state, action) => ({
    ...state,
    allSunglasses: [...state.allSunglasses, action.sunglasses].sort(
      sortByPrice
    ),
    filteredSunglasses: [...state.allSunglasses, action.sunglasses].sort(
      sortByPrice
    )
  }),
  [DELETE_SUNGLASSES]: (state, action) => ({
    ...state,
    selectedSunglasses: {},
    allSunglasses: state.allSunglasses.filter(
      sunglasses => sunglasses.id !== Number(action.id)
    )
  }),
  [EDIT_SUNGLASSES]: (state, action) => {
    let id = Number(action.id)
    if (state.selectedSunglasses.id === id) {
      const newSunglasses = [...state.allSunglasses].filter(
        sunglasses => sunglasses.id !== id
      )
      newSunglasses.push(action.sunglasses)
      return {
        ...state,
        selectedSunglasses: action.sunglasses,
        allSunglasses: newSunglasses
      }
    } else {
      return {
        ...state,
        allSunglasses: [...state.allSunglasses]
          .filter(sunglasses => sunglasses.id !== id)
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
  [REMOVE_ALL_FILTERS]: (state, action) => ({
    ...state,
    filteredSunglasses: [...state.allSunglasses],
    activeFilters: []
  }),
  [SET_FILTER]: (state, action) => {
    let sunglasses = []
    sunglasses = categoryFilter(state.allSunglasses, [
      ...state.activeFilters,
      action.filterType
    ])
    return {
      ...state,
      filteredSunglasses: sunglasses.sort(sortByPrice),
      activeFilters: [...state.activeFilters, action.filterType]
    }
  },
  [REMOVE_FILTER]: (state, action) => {
    if (state.activeFilters.length === 1) {
      return {
        ...state,
        activeFilters: [],
        filteredSunglasses: state.allSunglasses
      }
    }
    let activeFilters = state.activeFilters.filter(
      filter => filter !== action.filterType
    )
    let sunglasses = categoryFilter(state.allSunglasses, activeFilters)
    if (sunglasses.length === 0) {
      sunglasses = state.allSunglasses
    }
    return {...state, filteredSunglasses: sunglasses, activeFilters}
  },
  [ADD_CATEGORY]: (state, action) => ({
    ...state,
    categories: [...state.categories, action.category]
  })
}

export const sunglassesReducer = (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action)
  }
  return state
}
