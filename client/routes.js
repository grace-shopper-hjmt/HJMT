import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllSunglasses,
  SingleSunglasses,
  NewSunglasses,
  EditSunglasses,
  AllUsers,
  SingleUser,
  Cart,
  Checkout,
  EditUsers,
  AllOrders
} from './components'
import {Paginate} from './components/paginate'
import {me} from './store'
import {fetchSunglasses, fetchCategories} from '../client/store/sunglasses'
import {fetchUsers} from '../client/store/admin'

//COMPONENT
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchInitialSunglasses()
    this.props.categories()
    this.props.fetchInitialUsers()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route exact path="/sunglasses/:id/edit" component={EditSunglasses} />
        <Route path="/sunglasses/:id" component={SingleSunglasses} />
        <Route exact path="/sunglasses" component={Paginate} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/newSunglasses" component={NewSunglasses} />
        <Route exact path="/users" component={AllUsers} />
        <Route exact path="/users/:id" component={SingleUser} />
        <Route exact path="/home/edit" component={EditUsers} />
        <Route exact path="/orders" component={AllOrders} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

//CONTAINER
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id. Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    fetchInitialSunglasses: () => dispatch(fetchSunglasses()),
    categories: () => dispatch(fetchCategories()),
    fetchInitialUsers: () => dispatch(fetchUsers())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

//PROP TYPES
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
