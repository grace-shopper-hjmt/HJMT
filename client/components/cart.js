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
        const orders = this.state.cartItems.map(item => {
            return ({
                userId: this.props.user.id,
                quantity: item.quantity,
                sunglassId: item.sunglass.id,
                price: item.sunglass.price,
            })
        })

        axios.post('/api/order', {orderItems: orders})
        axios.delete('/api/cart', {data: {userId: this.props.user.id}})
        this.setState({cartItems: []})
    }

    async componentDidMount() {
        const { data } = await axios.get('/api/cart')
        this.setState({cartItems: data})
    }
    render() {
        return (
        <div>
            {
             (this.state.cartItems.length) ? 
                <div>
                    {
                        this.state.cartItems.map(item => {
                            return <CartItem key={item.id} sunglasses={item.sunglass} quantity={item.quantity} />

                        }) 
                    }
                     <button type="button" onClick={this.placeOrder}>Place Order</button>
                </div>
                
            : <div>There are no items in your cart!</div>
            }
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