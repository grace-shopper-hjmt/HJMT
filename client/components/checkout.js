import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class DisconnectedCheckout extends React.Component {
    constructor() {
        super()
        this.state = {
            cartItems: []
        }

        this.placeOrder = this.placeOrder.bind(this)
    }
    async componentDidMount() {
        const { data } = await axios.get('/api/cart')
        this.setState({cartItems: data})
    }

    placeOrder() {
    const orders = this.state.cartItems.map(item => {
        return ({
            name: item.sunglass.name,
            description: item.sunglass.description,
            imageUrl: item.sunglass.imageUrl,
            quantity: item.quantity,
            price: item.sunglass.price,
            sunglassId: item.sunglass.id,
            userId: this.props.user.id,
        })
    })

    axios.post('/api/order', {orderItems: orders})
    axios.delete('/api/cart', {data: {userId: this.props.user.id}})
    this.setState({cartItems: []})
}

    render() {
        return (
            <div>
                {
                    (this.state.cartItems.length) ? 
                        <div>
                             <h3>Please review your order below:</h3>
                                {
                                    this.state.cartItems.map(item => {
                                        return (
                                            <div key={item.id}>
                                                <h4>{item.sunglass.name}</h4>
                                                <h5>Quantity:{item.quantity}</h5>
                                            </div>
                                        )
                                    })
                                }

                                {/* insert stripe stuff here */}

                                <button type="button" onClick={this.placeOrder}>Place order</button>                
                        </div> : <div>There are no items in your cart!</div>
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

export const Checkout = connect(mapState)(DisconnectedCheckout)