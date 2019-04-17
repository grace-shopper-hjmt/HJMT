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
      brand: '',
      color: '',
      shape: ''
    }
  }
  handleChange(event) { }
  handleSubmit(event) { }

  render() {
    const { name, price, imageUrl, description, inventory, brand, color, shape } = this.state
    return (
      <div>
        <main>
          <h1>Add new sunglasses here!</h1>
          <form>
            <label>



            </label>
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
