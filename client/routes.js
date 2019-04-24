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
  AllOrders,
  SingleOrder
} from './components'
import {Paginate} from './components/paginate'
import {me} from './store'
import { fetchSunglasses, fetchCategories } from '../client/store/sunglasses'
import {fetchUsers} from '../client/store/admin'
import {fetchOrders} from '../client/store/order'

//COMPONENT
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchInitialSunglasses()
    this.props.categories()
    this.props.fetchInitialUsers()
    this.props.fetchInitialOrders()
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
        <Route exact path="/orders" component={AllOrders} />
        <Route path="/orders/:id" component={SingleOrder} />
        <Route exact path="/users/:id/edit" component={EditUsers} />
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
    fetchInitialUsers: () => dispatch(fetchUsers()),
    fetchInitialOrders: () => dispatch(fetchOrders())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

//PROP TYPES
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
