import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const DisconnectedAllSunglasses = props => {
  return (
    <div>
      <h1>HELLO INSIDE ALLSUNGLASSES!</h1>
      {props.sunglasses.length > 0 ? (
        <div>
          {props.sunglasses.map(sunglasses => (
            <div key={sunglasses.id}>
              <img src={sunglasses.imageUrl} />
              <Link to={`/sunglasses/${sunglasses.id}`} className="navlink">
                <span>{sunglasses.name}</span>
              </Link>
              <h2>Price: ${sunglasses.price / 100}</h2>
              <h2>Brand: {sunglasses.brand}</h2>
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

export const AllSunglasses = connect(mapState)(DisconnectedAllSunglasses)
