import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {thunkDeleteSunglasses, fetchCategories } from '../store/sunglasses'
import Sidebar from './filter-sidebar'

const DisconnectedAllSunglasses = props => {
  let sunglasses = []
  if (props.filteredSunglasses.length > 0) {
    sunglasses = props.filteredSunglasses
  } else {
    sunglasses = props.sunglasses
  }

  return (
    <div>
      <Link to='/newSunglasses'>create Sunglasses!</Link>
      <Sidebar />
      {sunglasses.length > 0 ? (
        <div>
          {sunglasses.map(sunglass => (
            <div key={sunglass.id}>
              <img src={sunglass.imageUrl} />
              <Link to={`/sunglasses/${sunglass.id}`} className="navlink">
                <span>{sunglass.name}</span>
              </Link>
              <h2>Price: ${sunglass.price / 100}</h2>
              <button
                    type="button"
                    // className="tooltip"
                    onClick={() => props.deleteSunglasses(sunglasses.id)}
                  >
                    {/* <span  className="tooltiptext">rude!</span> */}
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
  sunglasses: state.sunglasses.allSunglasses,
  filteredSunglasses: state.sunglasses.filteredSunglasses
})


const mapDispatch = (dispatch, ownProps) => {
  return {
    deleteSunglasses: newProps => {
      dispatch(thunkDeleteSunglasses(newProps, ownProps));
    },
    getCategories: () => dispatch(fetchCategories())
  };
};

export const AllSunglasses = connect(mapState, mapDispatch)(DisconnectedAllSunglasses)
