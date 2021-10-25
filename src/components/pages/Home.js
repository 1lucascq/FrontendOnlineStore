import React, { Component } from 'react';
import Cart from '../Cart';

export default class Home extends Component {
  render() {
    return (
      <div data-testid="home-initial-message">
        <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
        <Cart />
      </div>

    );
  }
}
