import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Sidebar from './filter-sidebar'

// class DisconnectedAllSunglasses extends React.Component {
//     render() {
//         return (
//             <h1>ALL SUNGLASSES HERE</h1>
//         )
//     }
// }

const DisconnectedAllSunglasses = props => {
  console.log(props)
  return (
    <div>
      <h1>HELLO INSIDE ALLSUNGLASSES!</h1>
      <Sidebar />
    </div>
  )
}

const mapState = state => ({
  sunglasses: state.sunglasses.allSunglasses
})

export const AllSunglasses = connect(mapState)(DisconnectedAllSunglasses)
