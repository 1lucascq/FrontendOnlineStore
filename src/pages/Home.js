import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Categories from '../components/Categories';
import Cart from '../components/Cart';
import SearchProducts from '../components/SearchProducts';

export default class Home extends Component {
  render() {
    const {
      query,
      queryResults,
      handleClick,
      handleChange,
      quantity,
      getCartQuantity } = this.props;
    return (
      <div data-testid="home-initial-message">
        <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
        <SearchProducts
          query={ query }
          queryResults={ queryResults }
          handleChange={ handleChange }
          handleClick={ handleClick }
          getCartQuantity={ getCartQuantity }
        />
        <Cart quantity={ quantity } />
        <Categories handleChange={ handleChange } />
      </div>

    );
  }
}

Home.propTypes = {
  query: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  queryResults: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  getCartQuantity: PropTypes.func.isRequired,
};
