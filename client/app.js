import React from 'react'
// import {Navbar} from './components'
import {AppBar} from './components'
import Routes from './routes'
import CssBaseline from '@material-ui/core/CssBaseline'

const App = () => {
  return (
    <div>
      <AppBar />
      <Routes />
      <CssBaseline />
    </div>
  )
}

export default App
