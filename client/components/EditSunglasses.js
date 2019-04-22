/* eslint-disable guard-for-in */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateSunglasses, fetchOneSunglasses, fetchCategories} from '../store/sunglasses'
import {Link, withRouter} from 'react-router-dom'
import Button from '@material-ui/core/Button'

class DisconnectedEditSunglasses extends Component {
  constructor() {
    super()
    this.state = {
      sunglassesAtt: {
        name: '',
        price: '',
        imageUrl: '',
        description: '',
        inventory: '',
        warning: 'Field is required'
      },
      categories: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const sunglassesId = this.props.match.params.id
    this.props.getCategories()
    this.props.fetchCurrentSunglasses(sunglassesId)
    const sunglassesCategories = this.props.sunglasses.categories
    const categories = {}
    for (let i = 0; i < sunglassesCategories.length; i++) {
      categories[sunglassesCategories[i].type] = sunglassesCategories[i].name
    }
    const sunglassesAtt = {
      name: this.props.sunglasses.name,
      price: this.props.sunglasses.price,
      imageUrl: this.props.sunglasses.imageUrl,
      description: this.props.sunglasses.description,
      inventory: this.props.sunglasses.inventory
    }
    this.setState({
      sunglassesAtt, categories
    })
  }
  handleChange(event) {
    const sunglassesAtt = {...this.state.sunglassesAtt}
    sunglassesAtt[event.target.name] = event.target.value
    this.setState({ sunglassesAtt })
  }
  handleSubmit(event) {
    event.preventDefault()
    try {
      this.props.updateSunglasses({...this.state})
    } catch (error) {
      console.error('Cannot submit the form')
    }
  }
  getCategories = () => {
    let categories = this.props.categories
    if (categories) {
      let cats = []
      for (let i = 0; i < categories.length; i++) {
        if (!cats.includes(categories[i].type)) {
          cats.push(categories[i].type)
        }
      }
      return cats
    }
    return []
  }
  handleCategoryChange = event => {
    const categories = {...this.state.categories}
    categories[event.target.dataset.cattype] = event.target.value
    this.setState({categories})
  }

  render() {
    const {name, price, imageUrl, description, inventory, warning} = this.state.sunglassesAtt
    return (
      <div>
        <main>
          <h1>Edit sunglasses here!</h1>

          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              {!name && warning && <span className="warning">{warning}</span>}
              <input
                onChange={this.handleChange}
                name="name"
                type="text"
                value={name}
              />
            </label>

            <label>
              Price:
              {!price && warning && <span className="warning">{warning}</span>}
              <input
                onChange={this.handleChange}
                name="price"
                type="number"
                step=".01"
                value={price}
              />
            </label>

            <label>
              ImageUrl:
              <input
                onChange={this.handleChange}
                name="imageUrl"
                type="text"
                value={imageUrl}
              />
            </label>

            <label>
              Description:
              <input
                onChange={this.handleChange}
                name="description"
                type="text"
                value={description}
              />
            </label>

            <label>
              Inventory:
              {!inventory &&
                warning && <span className="warning">{warning}</span>}
              <input
                onChange={this.handleChange}
                name="inventory"
                type="number"
                value={inventory}
              />
            </label>

            <h3>Categories:</h3>
            {this.getCategories().map(category => {
              return (
                <label className="addCategories" key={category}>
                  {category}:
                  <input
                    name="categories"
                    data-catType={category}
                    value={this.state.categories[category]}
                    type="text"
                    onChange={this.handleCategoryChange}
                  />
                </label>
              )
            })}

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>

          <h4>
            <Link to="/sunglasses">Back</Link>
          </h4>
        </main>
      </div>
    )
  }
}

const mapState = state => {
  return {
    sunglasses: state.sunglasses.selectedSunglasses,
    categories: state.sunglasses.categories
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    updateSunglasses: updatedSunglasses => {
      dispatch(
        updateSunglasses(updatedSunglasses, ownProps.match.params.id, ownProps)
      )
    },
    fetchCurrentSunglasses: sunglasses => {
      dispatch(fetchOneSunglasses(sunglasses))
    },
    getCategories: () => dispatch(fetchCategories())
  }
}

export const EditSunglasses = withRouter(
  connect(mapState, mapDispatch)(DisconnectedEditSunglasses)
)
