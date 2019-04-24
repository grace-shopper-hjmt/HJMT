import React from 'react'

export const CartItem = (props) => {
    console.log('CART ITEM PROPS:', props)
    const {id, name, price, inventory} = props.sunglasses
    return (
        <div>
            <h2>Product name: {name}</h2>
            <h3>Price: ${price / 100} each</h3>
            <label htmlFor="quantity">
                <input name="quantity" type="number" value={props.quantity} min={1} max={inventory} onChange={() => props.handleChange(event, props.index)}></input>
            </label>
            <button type="button" onClick={() => props.removeItem(id)}>REMOVE ITEM</button>
        </div>
    )
}