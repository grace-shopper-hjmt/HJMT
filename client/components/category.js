import React from 'react'
import {connect} from 'react-redux'
import {setFilter, removeFilter} from '../store/sunglasses'

class Category extends React.Component {
  constructor() {
    super()
    this.state = {
      subCategories: []
    }
  }

  componentDidMount() {
    const currentCategory = this.props.category
    const allCategories = this.props.allCategories
    const items = []
    for (let i = 0; i < allCategories.length; i++) {
      let category = allCategories[i]
      if (!items.includes(category.name) && category.type === currentCategory) {
        items.push(category.name)
      }
    }
    this.setState({subCategories: items})
  }

  handleChange = event => {
    if (event.target.checked) {
      this.props.categoryFilter(event.target.value)
    } else {
      this.props.removeCatFilter(event.target.value)
    }
  }

  render() {
    const category = this.props.category
    return (
      <div className="filter-category">
        <h3>{category}</h3>
        {this.state.subCategories.map(subCategory => {
          return (
            <label key={subCategory}>
              <input
                type="checkbox"
                onChange={this.handleChange}
                value={subCategory}
              />
              {subCategory}
            </label>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    sunglasses: state.sunglasses.allSunglasses
  }
}

const mapDispatch = dispatch => {
  return {
    categoryFilter: filterType => dispatch(setFilter(filterType)),
    removeCatFilter: filterType => dispatch(removeFilter(filterType))
  }
}


export default connect(mapState)(Category)
