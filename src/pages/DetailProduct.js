import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { saveReview, getFavoriteProduct } from '../services/manageCart';

export default class DetailProduct extends Component {
  constructor() {
    super();

    this.state = {
      productDetail: {
        title: '',
        price: '',
        thumbnail: '',
        reviews: [],
      },
    };
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
    this.getReviewLocalStorage = this.getReviewLocalStorage.bind(this);
  }

  async componentDidMount() {
    this.findDetailProduct();
    this.getReviewLocalStorage();
  }

  getReviewLocalStorage() {
    const results = getFavoriteProduct('commentReview');
    const { match: { params: { id } } } = this.props;
    const reviews = results.filter((review) => review.id === id);
    this.setState({
      reviews,
    });
  }

  saveLocalStorage(event) {
    event.preventDefault();
    const { match: { params: { id } } } = this.props;
    const { emailReview, radioReview, textAreaReview } = this.props;
    const review = { emailReview, radioReview, textAreaReview, id };
    saveReview(review);
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
       { title, price, thumbnail },
    productDetail,
    reviews } = this.state;
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
                  <button onClick={ this.saveLocalStorage } type="submit">Avaliar</button>
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
  queryResults: PropTypes.string.isRequired,
  emailReview: PropTypes.string.isRequired,
  radioReview: PropTypes.string.isRequired,
  textAreaReview: PropTypes.string.isRequired,
};
