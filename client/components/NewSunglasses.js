/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {thunkAddSunglasses} from '../store/sunglasses'
import {Link} from 'react-router-dom'

class DisconnectedNewSunglasses extends Component {
  constructor() {
    super()
    this.state = {
      sunglassesAtt: {
        name: '',
        price: '',
        description: '',
        inventory: '',
        warning: 'Field is required'
      },
      categories: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const sunglassesAtt = {...this.state.sunglassesAtt}
    sunglassesAtt[event.target.name] = event.target.value
    this.setState({ sunglassesAtt })
  }
  handleSubmit(event) {
    event.preventDefault()
    try {
      this.props.thunkAddSunglasses({...this.state})
    } catch (error) {
      console.error('Cannot submit the form')
    }
  }
  getCategories = () => {
    let categories = this.props.categories
    if (categories[0]) {
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
    const {
      name,
      price,
      imageUrl,
      description,
      inventory,
      warning
    } = this.state.sunglassesAtt
    return (
      <div>
        <main>
          <h1>Add new sunglasses here!</h1>
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

            <button type="submit">Submit</button>
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
    categories: state.sunglasses.categories
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    thunkAddSunglasses: newProps => {
      dispatch(thunkAddSunglasses(newProps, ownProps))
    }
  }
}

export const NewSunglasses = connect(mapState, mapDispatch)(
  DisconnectedNewSunglasses
)
