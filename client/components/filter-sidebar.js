import React from 'react'
import {connect} from 'react-redux'
import {filterSunglasses} from '../store/sunglasses'
import Category from './category'

class Sidebar extends React.Component {
  getFilters = () => {
    let sunglasses = this.props.sunglasses
    const nonCategories = [
      'id',
      'name',
      'imageUrl',
      'description',
      'inventory',
      'createdAt',
      'updatedAt',
      'price'
    ]
    if (this.props.sunglasses[0]) {
      let categories = Object.keys(sunglasses[0]).filter(
        cat => !nonCategories.includes(cat)
      )
      return categories.map(category => <Category category={category} key={category}/>)
    }
    return []
  }

  render() {
    return( 
    <div>
        {this.getFilters()}
        <div className="filter-category">
            <label>
                <input type="checkbox" />
                Price
            </label>
        </div>
    </div>
  )}
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

export default connect(mapState, mapDispatch)(Sidebar)
