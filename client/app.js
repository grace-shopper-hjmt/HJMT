import React from 'react'
import { connect } from 'react-redux'
import { fetchSunglasses } from '../client/store/sunglasses'

import {Navbar} from './components'
import Routes from './routes'
import { Switch, Route} from 'react-router-dom'
import AllSunglasses from '../client/components/all-sunglasses'

class DisconnectedApp extends React.Component {
  componentDidMount() {
    this.props.fetchInitialSunglasses()
  }

  render() {
    return (
      <div>
      <Navbar />
      <Routes />
      <Switch>
        <Route exact path="/sunglasses" component={AllSunglasses}/>
      </Switch>
    </div>
    )
  }
}

const mapDispatch = dispatch => {
  return ({
    fetchInitialSunglasses: () => dispatch(fetchSunglasses())
  })
}

const App = connect(null, mapDispatch)(DisconnectedApp)

export default App
