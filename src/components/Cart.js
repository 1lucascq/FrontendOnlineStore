import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCartProduct } from '../services/manageCart';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      quantity: '',
    };
  }

  componentDidMount() {
    console.log('mount', this.state);
    this.getCartQuantity();
  }

  // componentDidUpdate(_prevProps, prevState) {
  //   if (prevState.quantity !== this.state.quantity) return this.getCartQuantity();
  //   console.log('up', this.state);

  // }

  getCartQuantity() {
    const products = getCartProduct('cartItems').length;
    console.log(products);
    this.setState({ quantity: products });
    // return products;
  }

  render() {
    const { quantity } = this.state;
    console.log('render');
    console.log(this.state);
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/shoppingCart">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs0BWuHgxw4SK8_
            8IPduATr0KXh4mgQjxIDA&usqp=CAU"
            alt="logo cart"
          />
        </Link>
        <h2 data-testid="shopping-cart-size">{ quantity }</h2>
      </div>
    );
  }
}
