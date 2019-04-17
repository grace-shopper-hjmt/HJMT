import React from 'react'
import {connect} from 'react-redux'

class Sidebar extends React.Component {
  
  filterFunction = cat => {
    const dontInclude = [
      'id',
      'name',
      'imageUrl',
      'description',
      'inventory',
      'createdAt',
      'updatedAt'
    ]

  }

  render() {
    return <div />
  }
}

const mapState = state => {
    return {
        sunglasses: state.sunglasses.allSunglasses
    }
}

const mapDispatch = dispatch => {
    return {
        
    }
}