/* eslint-disable complexity */
import React, { Component } from "react";
import { connect } from "react-redux";
import { thunkAddSunglasses } from '../store/sunglasses'
import { Link } from "react-router-dom";


export class NewSunglasses extends Component{
  constructor() {
    super()
    this.state = {
      name: '',
      price: '',
      imageUrl: '',
      description: '',
      inventory: '',
      warning:'Field is required'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]:event.target.value
    })
   }
  handleSubmit(event) {
    event.preventDefault()
    try {
      this.props.thunkAddSunglasses({...this.state})
    } catch (error) {
      console.error('Cannot submit the form')
    }
   }

  render() {
    const { name, price, imageUrl, description, inventory, warning} = this.state
    return (
      <div>
        <main>
          <h1>Add new sunglasses here!</h1>
          <form onSubmit={this.handleSubmit}>

            <label>
            Name:
                {!name && warning && <span className='warning'>{warning}</span>}
              <input
                onChange={this.handleChange}
                name='name'
                type='text'
                value={name}
              />
            </label>

            <label>
            Price:
                {!price && warning && <span className='warning'>{warning}</span>}
              <input
                onChange={this.handleChange}
                name='price'
                type='number'
                step='.01'
                value={price}
              />
            </label>

            <label>
            imageUrl:
                {!imageUrl && warning && <span className='warning'>{warning}</span>}
              <input
                onChange={this.handleChange}
                name='imageUrl'
                type='img'
                value={imageUrl}
              />
            </label>

            <label>
            description:
                {!description && warning && <span className='warning'>{warning}</span>}
              <input
                onChange={this.handleChange}
                name='description'
                type='text'
                value={description}
              />
            </label>


            <label>
            inventory:
                {!inventory && warning && <span className='warning'>{warning}</span>}
              <input
                onChange={this.handleChange}
                name='inventory'
                type='text'
                value={inventory}
              />
            </label>


<button type='submit'>Submit</button>
          </form>
          <h4>
            <Link to='/sunglasses'>Back</Link>
          </h4>
          </main>
        </div>
    )
}
}


const mapDispatch = (dispatch, ownProps) => {
  return {
    thunkAddSunglasses: newProps => {
      dispatch(thunkAddSunglasses(newProps, ownProps))
   }
  }
}

export default connect(null, mapDispatch)(NewSunglasses)
