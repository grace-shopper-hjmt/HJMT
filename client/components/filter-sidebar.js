import React from 'react'
import {connect} from 'react-redux'
import {
  fetchCategories,
  removeAllFilters,
  fetchSunglasses
} from '../store/sunglasses'
import Category from './category'
import { Link } from 'react-router-dom'

class Sidebar extends React.Component {
  
  componentDidMount() {
    this.props.getCategories()
    this.props.getSunglasses()
  }
  getFilters = () => {
    let categories = this.props.categories
    if (categories) {
      let cats = []
      for (let i = 0; i < categories.length; i++) {
        if (!cats.includes(categories[i].type)) {
          cats.push(categories[i].type)
        }
      }
      return cats.map(category => (
        <Category
          category={category}
          key={category}
          allCategories={categories}
        />
      ))
    }
    return []
  }

  handleFilterRemove = event => {
    event.preventDefault()
    this.props.removeFilters()
    document
      .querySelectorAll('input[type=checkbox]')
      .forEach(el => (el.checked = false))
  }

  render() {
    return (
      <div className='sidebar'>
            <Link to='/newSunglasses'>Create Sunglasses!</Link>
        <h3>{this.props.resultsTotal} results found.</h3>
        <button type="button" onClick={this.handleFilterRemove}>
          Clear Filters
        </button>
        {this.getFilters()}
      </div>
    )
  }
}

const mapState = state => {
  return {
    categories: state.sunglasses.categories
  }
}

const mapDispatch = dispatch => {
  return {
    getCategories: () => dispatch(fetchCategories()),
    removeFilters: () => dispatch(removeAllFilters()),
    getSunglasses: () => dispatch(fetchSunglasses())
  }
}

export default connect(mapState, mapDispatch)(Sidebar)
