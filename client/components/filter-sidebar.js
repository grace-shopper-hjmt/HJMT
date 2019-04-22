import React from 'react'
import {connect} from 'react-redux'
import {fetchCategories, filterByPrice, removeAllFilters, removePriceFilter} from '../store/sunglasses'
import Category from './category'

class Sidebar extends React.Component {
  getFilters = () => {
    let categories = this.props.categories
    if (categories[0]) {
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

  handlePriceFilter = event => {
    if (event.target.checked) {
      this.props.priceFilter(event.target.dataset.min, event.target.dataset.max)
    } else {
        this.props.removePriceFilters(event.target.dataset.min, event.target.dataset.max)
    }
  }
  handleFilterRemove = event => {
      event.preventDefault()
      this.props.removeFilters()
      document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
  }

  render() {
    return (
      <div>
          <button type='button' onClick={this.handleFilterRemove}>Clear Filters</button>
        {this.getFilters()}
        <div className="filter-category">
          <h3>Price</h3>
          <label>
            <input
              type="checkbox"
              data-min="0"
              data-max="50"
              onChange={this.handlePriceFilter}
            />
            $0 - $50
          </label>
          <label>
            <input
              type="checkbox"
              data-min="51"
              data-max="100"
              onChange={this.handlePriceFilter}
            />
            $51 - $100
          </label>
          <label>
            <input
              type="checkbox"
              data-min="101"
              data-max="10000"
              onChange={this.handlePriceFilter}
            />
            $101+
          </label>
        </div>
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
    priceFilter: (min, max) => dispatch(filterByPrice(min, max)),
    removeFilters: () => dispatch(removeAllFilters()),
    removePriceFilters: (min, max) => dispatch(removePriceFilter(min, max))
  }
}

export default connect(mapState, mapDispatch)(Sidebar)
