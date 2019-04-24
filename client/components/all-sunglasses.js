import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCategories } from '../store/sunglasses'
import Sidebar from './filter-sidebar'

const DisconnectedAllSunglasses = props => {
  let sunglasses = props.sunglasses
  return (
    <div className='all-sunglasses'>
      <Sidebar resultsTotal={props.total} />
      {!!sunglasses && sunglasses.length > 0 ? (
        <div className='sunglasses-view'>
          {sunglasses.map(sunglass => (
            <div key={sunglass.id} className='sunglasses-card'>
              <Link to={`/sunglasses/${sunglass.id}`} className="navlink">
              <img src={sunglass.imageUrl} />
                <h3>Brand: {sunglass.name}</h3>
              <h2>${sunglass.price / 100}</h2>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h1>There are no sunglasses that match your search criteria</h1>
      )}
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    getCategories: () => dispatch(fetchCategories())
  };
};

export const AllSunglasses = connect(null, mapDispatch)(DisconnectedAllSunglasses)
