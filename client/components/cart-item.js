import React from 'react'

export const CartItem = (props) => {
    const {id, name, price} = props.sunglasses
    return (
        <div>
            <h2>Product name: {name}</h2>
            <h3>Price: ${price / 100} each</h3>
            <label htmlFor="quantity">
                <input name="quantity" type="number" value={props.quantity} onChange={() => props.handleChange(event, props.index)}></input>
            </label>
            <button type="button" onClick={() => props.removeItem(id)}>REMOVE ITEM</button>
        </div>
    )
}