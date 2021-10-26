import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CardProduct extends Component {
  render() {
    const { product: { price, thumbnail, title, id } } = this.props;
    return (
      <div data-testid="product">
        <Link
          to={ `/detailProduct/${id}` }
          data-testid="product-detail-link"
        >
          <h4>{title}</h4>
          <img width="50px" src={ thumbnail } alt="product logo" />
          <p>{price}</p>
        </Link>
      </div>
    );
  }
}

CardProduct.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};
