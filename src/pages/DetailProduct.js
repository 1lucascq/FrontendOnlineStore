import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { saveReview, getCartProduct, addProduct } from '../services/manageCart';
import Cart from '../components/Cart';

export default class DetailProduct extends Component {
  constructor() {
    super();

    this.state = {
      productDetail: {
        title: '',
        price: '',
        thumbnail: '',
        quantity: 0,
        shipping: {
          free_shipping: false,
        },
      },
      reviews: [],
    };
    this.saveReviewLocalStorage = this.saveReviewLocalStorage.bind(this);
    this.getReviewLocalStorage = this.getReviewLocalStorage.bind(this);
    this.saveProductLocalStorage = this.saveProductLocalStorage.bind(this);
    this.getCartQuantity = this.getCartQuantity.bind(this);
  }

  async componentDidMount() {
    this.findDetailProduct();
    this.getReviewLocalStorage();
    this.getCartQuantity();
  }

  getCartQuantity() {
    const response = getCartProduct('cartItems').length;
    this.setState({ quantity: response });
  }

  getReviewLocalStorage() {
    const results = getCartProduct('commentReview');
    const { match: { params: { id } } } = this.props;
    const reviews = results.filter((review) => review.id === id);
    this.setState({
      reviews,
    });
  }

  saveReviewLocalStorage(event) {
    event.preventDefault();
    const { match: { params: { id } } } = this.props;
    const { emailReview, radioReview, textAreaReview } = this.props;
    const review = { emailReview, radioReview, textAreaReview, id };
    saveReview(review);
  }

  saveProductLocalStorage() {
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
    const { productDetail:
      { title, price, thumbnail, shipping },
    productDetail,
    reviews,
    quantity } = this.state;
    const freeShipping = shipping.free_shipping;
    const { handleChange, emailReview, textAreaReview } = this.props;
    return (
      <div>
        {productDetail
          && (
            <div>
              <div>
                <h1 data-testid="product-detail-name">{ title }</h1>
                <h2>{`R$${price}`}</h2>
                <img src={ thumbnail } alt="product" />
                <div>
                  { freeShipping
                    && <span data-testid="free-shipping">Frete Grátis</span> }
                </div>
              </div>
              <div>
                <form>
                  <input
                    onChange={ handleChange }
                    name="emailReview"
                    value={ emailReview }
                    type="email"
                  />
                  <input
                    onChange={ handleChange }
                    name="radioReview"
                    value="1"
                    type="radio"
                  />
                  <input
                    onChange={ handleChange }
                    name="radioReview"
                    value="2"
                    type="radio"
                  />
                  <input
                    onChange={ handleChange }
                    name="radioReview"
                    value="3"
                    type="radio"
                  />
                  <input
                    onChange={ handleChange }
                    name="radioReview"
                    value="4"
                    type="radio"
                  />
                  <input
                    onChange={ handleChange }
                    name="radioReview"
                    value="5"
                    type="radio"
                  />
                  <textarea
                    data-testid="product-detail-evaluation"
                    name="textAreaReview"
                    value={ textAreaReview }
                    onChange={ handleChange }
                  />
                  <button
                    onClick={ this.saveReviewLocalStorage }
                    type="button"
                  >
                    Avaliar

                  </button>
                </form>
              </div>
              <div>
                {reviews && reviews.map((review) => (
                  <div key={ review.id }>
                    <p>
                      { review.emailReview }
                      {' '}
                      { review.radioReview }
                    </p>
                    {review.textAreaReview.length > 1 && (
                      <p>{ review.textAreaReview }</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ this.saveProductLocalStorage }
          type="button"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs0BWuHgxw4SK8_
            8IPduATr0KXh4mgQjxIDA&usqp=CAU"
            alt="logo cart"
            width="30px"
          />
        </button>
        <Cart quantity={ quantity } />
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
  handleChange: PropTypes.func.isRequired,
  emailReview: PropTypes.string.isRequired,
  radioReview: PropTypes.string.isRequired,
  textAreaReview: PropTypes.string.isRequired,
  queryResults: PropTypes.arrayOf(PropTypes.object).isRequired,
};
