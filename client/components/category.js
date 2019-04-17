import React from 'react'
import {connect} from 'react-redux'
import {filterSunglasses} from '../store/sunglasses'

class Category extends React.Component {
  constructor() {
    super()
    this.state = {
      categoryItems: []
    }
  }

  componentDidMount() {
    const category = this.props.category
    const sunglasses = this.props.sunglasses
    const items = []
    for (let j = 0; j < sunglasses.length; j++) {
      let currentSunglasses = sunglasses[j]
      if (!items.includes(currentSunglasses[category])) {
          items.push(currentSunglasses[category])
      }
    }
    this.setState({ categoryItems: items })
  }

  render() {
    const category = this.props.category
    return (
      <div className="filter-category">
        <h3>{category}</h3>
        {this.state.categoryItems.map(item => {
          return (
            <label key={item}>
              <input type="checkbox" />
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
    filter: (filter, filterType) =>
      dispatch(filterSunglasses(filter, filterType))
  }
}

export default connect(mapState, mapDispatch)(Category)
