import React, { Component } from 'react';
import Categories from '../components/Categories';
import Cart from '../components/Cart';
import SearchProducts from '../components/SearchProducts';

export default class Home extends Component {
  render() {
    return (
      <div data-testid="home-initial-message">
        <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
        <SearchProducts />
        <Cart />
        <Categories />
      </div>

    );
  }
}
