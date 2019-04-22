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

        this.handleChange = this.handleChange.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.placeOrder = this.placeOrder.bind(this)
    }

    handleChange(event, index) {
        const { cartItems } = this.state
        cartItems[index].quantity = event.target.value
        this.setState({cartItems: cartItems})
    }

    removeItem(sunglassesId) {
        const { cartItems } = this.state
        const updatedCartItems = cartItems.filter(item => {
            return item.sunglass.id !== sunglassesId
        })
        axios.delete(`/api/cart/${sunglassesId}`, {data: {userId: this.props.user.id}})
        this.setState({cartItems: updatedCartItems})
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

    async componentDidMount() {
        console.log('COMPONENT MOUNTED!')
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
                        this.state.cartItems.map((item, index) => {
                            return <CartItem key={item.id} 
                                            sunglasses={item.sunglass} 
                                            quantity={item.quantity}
                                            handleChange={this.handleChange} 
                                            removeItem={this.removeItem} 
                                            index={index}/>

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