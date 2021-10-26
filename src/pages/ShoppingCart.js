import React, { Component } from 'react';
import { getFavoriteProduct } from '../services/manageCart';

export default class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      shoppingCartItems: [],
    };
    this.getLocalStorageItems = this.getLocalStorageItems.bind(this);
  }

  componentDidMount() {
    this.getLocalStorageItems();
    console.log('DidMount');
  }

  getLocalStorageItems() {
    const shoppingCartItems = getFavoriteProduct();
    /* console.log(shoppingCartItems, 'oi'); */
    this.setState({
      shoppingCartItems,
    });
  }

  quantity(product) {
    const { shoppingCartItems } = this.state;
    const sameProductArray = shoppingCartItems.filter((item) => (
      item.id === product.id
    ));
    return sameProductArray.length;
  }

  render() {
    const { shoppingCartItems } = this.state;
    console.log(shoppingCartItems);

    if (!shoppingCartItems) {
      return (
        <div>
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        </div>
      );
    }

    return (
      <div>
        {shoppingCartItems.map((product) => (
          <div key={ product.id }>
            <p data-testid="shopping-cart-product-name">{product.title}</p>
            <p data-testid="shopping-cart-product-quantity">{this.quantity(product)}</p>
          </div>
        ))}
      </div>
    );
  }
}
