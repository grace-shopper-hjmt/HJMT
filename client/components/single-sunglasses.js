import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class DisconnectedSingleSunglasses extends React.Component {
    render() {
        return (
            <div>
                <h1>HELLO FROM SINGLESUNGLASSES!</h1>
                <button type="button">ADD TO CART</button>
                <h2>REVIEWS:</h2>
                <Link to="/home">BACK TO SEARCH RESULTS</Link>
            </div>
        )
    }
}

const mapState = state => ({
    sunglasses: state.sunglasses.selectedSunglasses
})

export const SingleSunglasses = connect(mapState)(DisconnectedSingleSunglasses)