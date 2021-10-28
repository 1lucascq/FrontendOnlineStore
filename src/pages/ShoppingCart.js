import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getFavoriteProduct } from '../services/manageCart';

export default class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      shoppingCartItems: [],
    };
    this.getLocalStorageItems = this.getLocalStorageItems.bind(this);
    this.quantity = this.quantity.bind(this);
  }

  componentDidMount() {
    this.getLocalStorageItems();
  }

  getLocalStorageItems() {
    const shoppingCartItems = getFavoriteProduct('cartItems');
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

    if (shoppingCartItems.length < 1) {
      return (
        <div>
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        </div>
      );
    }
    return (
      // Fazer filter para não aparecer repetido
      <div>
        {shoppingCartItems.map((product) => (
          <div key={ product.id }>
            <p data-testid="shopping-cart-product-name">{product.title}</p>
            <p data-testid="shopping-cart-product-quantity">{this.quantity(product)}</p>
          </div>
        ))}
        <Link to="/checkout" data-testid="checkout-products">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCxnRWU3UzTwR5LtVlg4tpTBGCbZi0SzB2cA&usqp=CAU" alt="checkout" />
        </Link>
      </div>
    );
  }
}
