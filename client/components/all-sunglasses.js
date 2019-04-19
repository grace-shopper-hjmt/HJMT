import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {thunkDeleteSunglasses} from '../store/sunglasses'

const DisconnectedAllSunglasses = props => {
  return (
    <div>
      <Link to='/newSunglasses'>create Sunglasses!</Link>
      {props.sunglasses.length > 0 ? (
        <div>
          {props.sunglasses.map(sunglasses => (
            <div key={sunglasses.id}>
              <Link to={`/sunglasses/${sunglasses.id}`} className="navlink">
              <img src={sunglasses.imageUrl} />
                <span>{sunglasses.name}</span>
              </Link>
              <h2>Price: ${sunglasses.price / 100}</h2>
              <button
                    type="button"
                    className="tooltip"
                    onClick={() => props.deleteSunglasses(sunglasses.id)}
                  >
                    <span  className="tooltiptext">rude!</span>
                    Delete
                  </button>
            </div>
          ))}
        </div>
      ) : (
        <h1>There are no sunglasses that match your search criteria</h1>
      )}
    </div>
  )
}

const mapState = state => ({
  sunglasses: state.sunglasses.allSunglasses
})
const mapDispatch = (dispatch, ownProps) => {
  return {
    deleteSunglasses: newProps => {
      dispatch(thunkDeleteSunglasses(newProps, ownProps));
    }
  };
};
export const AllSunglasses = connect(mapState, mapDispatch)(DisconnectedAllSunglasses)
