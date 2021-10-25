import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CardProduct extends Component {
  render() {
    // console.log(this.props);
    const { product: { price, thumbnail, title } } = this.props;
    return (
      <div data-testid="product">
        <h4>{title}</h4>
        <img width="50px" src={ thumbnail } alt="product logo" />
        <p>{price}</p>
      </div>
    );
  }
}

CardProduct.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};
