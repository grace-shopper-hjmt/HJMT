import axios from 'axios'


const initialState = {
    allSunglasses: [],
    selectedSunglasses: {}
}

const GET_ALL_SUNGLASSES = 'GET_ALL_SUNGLASSES'
const DELETE_SUNGLASSES = 'DELETE_SUNGLASSES'

export const getAllSunglasses = (sunglasses) => ({type: GET_ALL_SUNGLASSES, sunglasses})
export const deleteSunglasses = sunglassId => ({ type: DELETE_SUNGLASSES, sunglassId })

const handlers = {
  [GET_ALL_SUNGLASSES]: (state, action) => ({ ...state, allSunglasses: action.sunglasses }),
  [DELETE_SUNGLASSES]:(state, action) => ({...state, selectedSunglasses:{}, allSunglasses:state.allSunglasses.filter(sunglasses=> sunglasses.id !== action.sunglassId)})
}

export const fetchSunglasses = () => {
 return async dispatch => {
     try {
         const { data } = await axios.get('/api/sunglasses')
         dispatch(getAllSunglasses(data))
     } catch (error) {
        console.log('ERROR FETCHING SUNGLASSES', error)
     }
 }
}
export const thunkDeleteSunglasses = (sunglassId, ownProps) => {
  return async dispatch => {
    try {
     await axios.delete(`/api/sunglasses/${sunglassId}`)
      dispatch(deleteSunglasses(sunglassId))
      ownProps.history.push(`/sunglasses`)
    } catch (error) {
      console.log('Cannot remove sunglasses', error)
    }
  }
}

export const sunglassesReducer = (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action)
    }

    return state
}
