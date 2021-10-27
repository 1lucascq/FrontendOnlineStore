import React, { Component } from 'react';
import { getCartProduct, removeProduct } from '../services/manageCart';

export default class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      shoppingCartItems: [],
    };
    this.getLocalStorageItems = this.getLocalStorageItems.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
  }

  componentDidMount() {
    this.getLocalStorageItems();
  }

  getLocalStorageItems() {
    const shoppingCartItems = getCartProduct();
    this.setState({
      shoppingCartItems,
    });
  }

  increaseQuantity(product) {
    const { shoppingCartItems } = this.state;
    const { id, quantity } = product;
    const item = shoppingCartItems
      .map((it) => (it.id === id ? { ...it, quantity: quantity + 1 } : it));

    this.setState({
      shoppingCartItems: item,
    });
  }

  decreaseQuantity(product) {
    const { shoppingCartItems } = this.state;
    const { id, quantity } = product;
    const cartItems = shoppingCartItems
      .map((it) => (it.id === id ? { ...it, quantity: quantity - 1 } : it));

    if (quantity < 2) return this.updateState(product);

    this.setState({
      shoppingCartItems: cartItems,
    });
  }

  updateState(product) {
    const { shoppingCartItems } = this.state;
    removeProduct(product);
    const updatedCart = shoppingCartItems.filter((item) => item.id !== product.id);
    this.setState({ shoppingCartItems: updatedCart });
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
      <div>
        {shoppingCartItems.map((product) => (
          <div key={ product.id }>
            <p data-testid="shopping-cart-product-name">{product.title}</p>
            <button
              type="button"
              onClick={ () => this.updateState(product) }
            >
              X
            </button>
            <button
              type="button"
              onClick={ () => this.decreaseQuantity(product) }
              data-testid="product-decrease-quantity"
            >
              -
            </button>
            <p data-testid="shopping-cart-product-quantity">{product.quantity}</p>
            <button
              type="button"
              onClick={ () => this.increaseQuantity(product) }
              data-testid="product-increase-quantity"
            >
              +
            </button>
          </div>
        ))}
        <button
          type="button"
        >
          Finalizar Compra
        </button>
      </div>
    );
  }
}
