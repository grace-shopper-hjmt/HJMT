import React from 'react'

export const CartItem = (props) => {
    const {id, name, price} = props.sunglasses
    const quantity = props.quantity

    return (
        <div>
            <h2>Product name: {name}</h2>
            <h3>Price: ${price / 1000} each</h3>
            {/* <h3>Quantity: {quantity}</h3> */}
            <input name="quantity" type="number" onChange={() => props.handleChange(event, props.index)}></input>
            <button type="button" onClick={() => props.removeItem(id)}>REMOVE ITEM</button>
        </div>
    )
}