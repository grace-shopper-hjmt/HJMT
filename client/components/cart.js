import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { CartItem } from './cart-item'

class DisconnectedCart extends React.Component {
    constructor() {
        super()
        this.state = {
            cartItems: []
        }

        this.placeOrder = this.placeOrder.bind(this)
    }

    placeOrder() {
        //iterate through all cart items, create order items for each
        const orders = this.state.cartItems.map(item => {
            return ({
                userId: this.props.user.id,
                quantity: item.quantity,
                sunglassId: item.sunglass.id,
                price: item.sunglass.price,
                timestamp: Date.now()
            })
        })

        axios.post('/api/order', {orderItems: orders})
    }

    async componentDidMount() {
        const { data } = await axios.get('/api/cart')
        this.setState({cartItems: data})
    }
    render() {
        return (
        <div>
            {
             (this.state.cartItems.length) ? this.state.cartItems.map(item => {
                    return <CartItem key={item.id} sunglasses={item.sunglass} quantity={item.quantity} />
                }) : <div />
            }

            <button type="button" onClick={this.placeOrder}>Place Order</button>
        </div>
        )
    }
}

const mapState = state => {
    return ({
        user: state.user
    })
}

export const Cart = connect(mapState)(DisconnectedCart)