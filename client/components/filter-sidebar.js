import React from 'react'
import {connect} from 'react-redux'
import { fetchCategories } from '../store/sunglasses'
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
            console.log(cats)
        }
      return cats.map(category => <Category category={category} key={category}/>)
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
    categories: state.sunglasses.categories
  }
}

const mapDispatch = dispatch => {
  return {
    getCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapState, mapDispatch)(Sidebar)
