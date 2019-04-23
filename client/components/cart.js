import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {CartItem} from './cart-item'
import Button from '@material-ui/core/Button'

class DisconnectedCart extends React.Component {
    constructor() {
        super()
        this.state = {
            cartItems: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.removeItem = this.removeItem.bind(this)
    }

    async handleChange(event, index) {
        const { cartItems } = this.state
        cartItems[index].quantity = event.target.value
        this.setState({cartItems: cartItems})

        event.target.disabled = true
        console.log(event.target.disabled)
        await axios.put('/api/cart', {
            userId: this.props.user.id,
            sunglassId: this.state.cartItems[index].sunglass.id,
            quantity: this.state.cartItems[index].quantity
        })
        console.log('PUT REQUEST COMPLETE - QUANTITY UPDATED IN DB')
        event.target.disabled = false
        console.log(event.target.disabled)
    }

    removeItem(sunglassesId) {
        const { cartItems } = this.state
        const updatedCartItems = cartItems.filter(item => {
            return item.sunglass.id !== sunglassesId
        })
        axios.delete(`/api/cart/${sunglassesId}`, {data: {userId: this.props.user.id}})
        this.setState({cartItems: updatedCartItems})
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
                        this.state.cartItems.map((item, index) => {
                            return <CartItem key={item.id} 
                                            sunglasses={item.sunglass}
                                            quantity={item.quantity} 
                                            removeItem={this.removeItem} 
                                            handleChange={this.handleChange} 
                                            index={index}/>
                        }) 
                    }

                    <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        >
                        Check out
                    </Button>
                </div>
                
            : <div>There are no items in your cart!</div>
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

export const Cart = connect(mapState)(DisconnectedCart)
