import axios from 'axios'
import history from '../history'

const initialState = {
    allSunglasses: [],
    selectedSunglasses: {}
}

const GET_ALL_SUNGLASSES ='GET_ALL_SUNGLASSES'

export const getAllSunglasses = (sunglasses) => ({type: GET_ALL_SUNGLASSES, sunglasses})

const handlers = {
    [GET_ALL_SUNGLASSES]: (state, action) => ({...state, allSunglasses: action.sunglasses})
}

export const fetchSunglasses = () => {
 return async dispatch => {
     try { 
         const { data } = axios.get('/api/sunglasses')
         dispatch(getAllSunglasses(data))
     } catch (error) {
        console.log('ERROR FETCHING SUNGLASSES', error)
     }
 }
}

export const sunglassesReducer = (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action)
    }

    return state
}