import React from 'react'
import axios from 'axios'

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
        console.log(this.state)
        return (
        <div>
            {
             (this.state.cartItems.length) ? this.state.cartItems.map(item => {
                    return <h1 key={item.id}>{item.quantity}</h1>
                }) : <div />
            }
        </div>
        )
    }
}
