import React from 'react'
import {connect} from 'react-redux'
import {Cart} from './cart'
import {GuestCart} from './cart-guest'

class DisconnectedCartWrapper extends React.Component {
    render() {
        console.log('INSIDE CART WRAPPER, USER IS NOW: ', this.props.user)
        return (
            <div>
                {
                    this.props.user.id ? <Cart ownHistory={this.props.history}/> : <GuestCart ownHistory={this.props.history}/>
                }
            </div>
        )
    }
}

const mapState = state => {
    return {
        user: state.user
    }
}

export const CartWrapper = connect(mapState)(DisconnectedCartWrapper)
