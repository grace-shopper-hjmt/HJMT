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
      activeSunglasses: props.sunglasses.slice(offset, offset + 15)
    })
  }

  getPageCount = () => {
    return Math.ceil(this.state.sunglasses.length / 15)
  }

  handlePageClick = data => {
    let selected = data.selected
    const {sunglasses} = this.state
    const offset = selected * 15
    const currentSunglasses = sunglasses.slice(offset, offset + 15)
    this.setState({activeSunglasses: currentSunglasses, page: selected})
  }

  render() {
    return (
      <div className="all-sunglasses">
        <AllSunglasses sunglasses={this.state.activeSunglasses} total={this.state.sunglasses.length}/>
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
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
