import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
  }

  async componentDidMount() {
    this.findDetailProduct();
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
  queryResults: PropTypes.string.isRequired,
};
