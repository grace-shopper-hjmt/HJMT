import React from 'react'
import {connect} from 'react-redux'
import {setFilter} from '../store/sunglasses'

class Category extends React.Component {
  constructor() {
    super()
    this.state = {
      categoryItems: []
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
    this.setState({categoryItems: items})
  }

  handleChange = event => {
    if (event.target.checked) {
      this.props.filter(event.target.value)
    }
  }

  render() {
    const category = this.props.category
    return (
      <div className="filter-category">
        <h3>{category}</h3>
        {this.state.categoryItems.map(item => {
          return (
            <label key={item}>
              <input
                type="checkbox"
                onChange={this.handleChange}
                value={item}
              />
              {item}
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
    filter: filterType => dispatch(setFilter(filterType))
  }
}

export default connect(mapState, mapDispatch)(Category)
