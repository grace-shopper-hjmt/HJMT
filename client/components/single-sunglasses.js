import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchOneSunglasses} from '../store/sunglasses'
import {Review} from './reviews'

class DisconnectedSingleSunglasses extends React.Component {
  componentDidMount() {
    const sunglassesId = this.props.match.params.id
    this.props.fetchInitialSunglasses(sunglassesId)
  }
  render() {
    console.log('PROPS', this.props)
    const reviews = this.props.sunglasses.reviews
    console.log('reviews should be here: ', this.props.sunglasses.reviews)
    return (
      <div>
        <h1>{this.props.sunglasses.name}</h1>
        <h3>{this.props.sunglasses.description}</h3>
        <img src={this.props.sunglasses.imageUrl} />
        <h3>Price: ${this.props.sunglasses.price / 100}</h3>
        <h4>Inventory: {this.props.sunglasses.inventory}</h4>
        <button type="button">ADD TO CART</button>
        <h2>REVIEWS:</h2>
        {
          this.props.sunglasses.id ? reviews.map(review => {
            return <Review key={review.id} reviewContent={review} />
          }) : <div />
        }
        <Link to="/home">BACK TO SEARCH RESULTS</Link>
      </div>
    )
  }
}

const mapState = state => ({
  sunglasses: state.sunglasses.selectedSunglasses
})

const mapDispatch = dispatch => {
  return {
    fetchInitialSunglasses: sunglassesId =>
      dispatch(fetchOneSunglasses(sunglassesId))
  }
}

export const SingleSunglasses = connect(mapState, mapDispatch)(
  DisconnectedSingleSunglasses
)
