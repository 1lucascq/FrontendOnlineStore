import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addProduct } from '../services/manageCart';

export default class DetailProduct extends Component {
  constructor() {
    super();

    this.state = {
      productDetail: {
        title: '',
        price: '',
        thumbnail: '',
      },
    };
    this.saveInLocalStorage = this.saveInLocalStorage.bind(this);
  }

  async componentDidMount() {
    this.findDetailProduct();
  }

  saveInLocalStorage() {
    const { productDetail } = this.state;
    addProduct(productDetail);
  }

  findDetailProduct() {
    const { match: { params: { id } }, queryResults } = this.props;
    const result = queryResults.find((product) => product.id === id);
    this.setState({
      productDetail: result,
    });
  }

  render() {
    const { productDetail: { title, price, thumbnail }, productDetail } = this.state;
    return (
      <div>
        {productDetail
          && (
            <div>
              <h1 data-testid="product-detail-name">{ title }</h1>
              <h2>{`R$${price}`}</h2>
              <img src={ thumbnail } alt="product" />
            </div>
          )}
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ this.saveInLocalStorage }
          type="button"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs0BWuHgxw4SK8_
            8IPduATr0KXh4mgQjxIDA&usqp=CAU"
            alt="logo cart"
            width="30px"
          />
        </button>
        <Link data-testid="shopping-cart-button" to="/shoppingCart">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs0BWuHgxw4SK8_
            8IPduATr0KXh4mgQjxIDA&usqp=CAU"
            alt="logo cart"
          />
        </Link>
      </div>
    );
  }
}

DetailProduct.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  queryResults: PropTypes.arrayOf(PropTypes.object).isRequired,
};
