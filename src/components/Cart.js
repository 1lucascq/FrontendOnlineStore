import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Cart extends Component {
  render() {
    const { quantity } = this.props;
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

Cart.propTypes = {
  quantity: PropTypes.number.isRequired,
};
