import React from 'react'

export const CartItem = (props) => {
    console.log('props received by cart item: ', props)
    const {name, price} = props.sunglasses
    const quantity = props.quantity

    return (
        <div>
            <h2>Product name: {name}</h2>
            <h3>Price: ${price / 1000} each</h3>
            <h3>Quantity: {quantity}</h3>
        </div>
    )
}