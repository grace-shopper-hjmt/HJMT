import React from 'react'
import {connect} from 'react-redux'
import {AllSunglasses} from './all-sunglasses'
import ReactPaginate from 'react-paginate'

class DisconnectedPaginate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sunglasses: [],
      activeSunglasses: [],
      page: 0,
      offset: 0
    }
  }

  componentWillReceiveProps = (props) => {
    const {offset} = this.state 
    this.setState({
      sunglasses: props.sunglasses,
      activeSunglasses: props.sunglasses.slice(offset, offset + 2)
    })
  }

  getPageCount = () => {
    return Math.ceil(this.state.sunglasses.length / 2)
  }

  handlePageClick = data => {
    console.log(this.state)
    let selected = data.selected
    const {sunglasses} = this.state
    const offset = selected * 2
    const currentSunglasses = sunglasses.slice(offset, offset + 2)
    this.setState({activeSunglasses: currentSunglasses, page: selected})
  }

  render() {
    return (
      <div className="all-sunglasses">
        <AllSunglasses sunglasses={this.state.activeSunglasses} />
        <ReactPaginate
          previousLabel="previous"
          nextLabel="next"
          breakLabel="..."
          breakClassName="break-me"
          pageCount={this.getPageCount()}
          marginPagesDisplayed={2}
          pageRangeDisplayed={4}
          onPageChange={this.handlePageClick}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
        />
      </div>
    )
  }
}

const mapState = state => {
  return {
    sunglasses: state.sunglasses.filteredSunglasses
  }
}

export const Paginate = connect(mapState)(DisconnectedPaginate)
