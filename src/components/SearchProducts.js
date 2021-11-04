import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardProduct from './CardProduct';

export default class SearchProducts extends Component {
  render() {
    const {
      query,
      queryResults,
      handleChange,
      handleClick,
      getCartQuantity } = this.props;
    return (
      <main>
        <section>
          <label htmlFor="query">
            <input
              name="query"
              type="text"
              data-testid="query-input"
              value={ query }
              onChange={ handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="query-button"
            onClick={ handleClick }
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:
              ANd9GcT7KqS48I5Hjmvu-u7F3ruKUMjUvSMeqku9CA&usqp=CAU"
              alt="search logo"
              width="25px"
            />
          </button>
        </section>

        <section>
          {queryResults ? (
            queryResults
              .map((results) => (<CardProduct
                key={ results.id }
                product={ results }
                getCartQuantity={ getCartQuantity }
              />))
          ) : (
            <p>Nenhum produto foi encontrado</p>
          )}
        </section>
      </main>
    );
  }
}

SearchProducts.propTypes = {
  query: PropTypes.string.isRequired,
  queryResults: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  getCartQuantity: PropTypes.func.isRequired,
};
