import React from 'react'
import axios from 'axios'
import { CartItem } from './cart-item'

export class Cart extends React.Component {
    constructor() {
        super()
        this.state = {
            cartItems: []
        }
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

            <button type="button">Place Order</button>
        </div>
        )
    }
}
