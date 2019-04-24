import React from 'react'
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchOneSunglasses, thunkDeleteSunglasses} from '../store/sunglasses'
import {Review} from './reviews'
import Button from '@material-ui/core/Button'

class DisconnectedSingleSunglasses extends React.Component {
  constructor() {
    super()

    this.addToCart = this.addToCart.bind(this)
  }
  componentDidMount() {
    const sunglassesId = this.props.match.params.id
    this.props.fetchInitialSunglasses(sunglassesId)
  }

  addToCart() {
    axios.post(`/api/cart/${this.props.match.params.id}`, {
      userId: this.props.userId
    })
  }
  render() {
    const reviews = this.props.sunglasses.reviews
    return (
      <div className='singleFormContainer'>
        <div className='singleForm'>
        <h1>{this.props.sunglasses.name}</h1>
        <h3>{this.props.sunglasses.description}</h3>
        <img src={this.props.sunglasses.imageUrl} />
        <h3>Price: ${this.props.sunglasses.price / 100}</h3>
        <h4>Inventory: {this.props.sunglasses.inventory}</h4>
        <Button variant="contained" color="primary"type="button" onClick={this.addToCart}>
          ADD TO CART🛒
        </Button>
        <h2>REVIEWS:</h2>
        {this.props.sunglasses.id ? (
          reviews.map(review => {
            return <Review key={review.id} reviewContent={review} />
          })
        ) : (
          <div />
        )}
        <h3>
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={() =>
              this.props.deleteSunglasses(this.props.sunglasses.id)
            }
          >
            Delete
          </Button>
        </h3>
        <h4>
          <Link to="/sunglasses">BACK TO SUNGLASSES PAGE!</Link>
        </h4>
        <Link to="/home">BACK TO HOME</Link>
        <h4>
          <Link to={`/sunglasses/${this.props.sunglasses.id}/edit`}>Edit</Link>
          </h4>
          </div>
      </div>
    )
  }
}

const mapState = state => ({
  sunglasses: state.sunglasses.selectedSunglasses,
  userId: state.user.id
})

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchInitialSunglasses: sunglassesId => {
      dispatch(fetchOneSunglasses(sunglassesId))
    },
    deleteSunglasses: newProps => {
      dispatch(thunkDeleteSunglasses(newProps, ownProps))
    }
  }
}

export const SingleSunglasses = withRouter(connect(mapState, mapDispatch)(
  DisconnectedSingleSunglasses
))
