import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    this.showTotalPrice = this.showTotalPrice.bind(this);
  }

  componentDidMount() {
    this.getLocalStorageItems();
  }

  getLocalStorageItems() {
    const shoppingCartItems = getCartProduct('cartItems');
    this.setState({
      shoppingCartItems,
    });
  }

  increaseQuantity(product) {
    const { shoppingCartItems } = this.state;
    const { id, quantity } = product;
    const item = shoppingCartItems
      .map((cartItem) => (cartItem.id === id ? { ...cartItem,
        quantity: this.checkMaxQuantity(cartItem, quantity) } : cartItem));

    this.setState({
      shoppingCartItems: item,
    });
  }

  checkMaxQuantity(it, quantity) {
    if (it.quantity === it.availableQuantity) {
      return quantity;
    }
    return quantity + 1;
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

  showTotalPrice() {
    const { shoppingCartItems } = this.state;
    const totalPrice = shoppingCartItems
      .map((product) => product.price * product.quantity);
    const allProductsPrices = totalPrice.reduce((acc, current) => acc + current);
    return allProductsPrices;
  }

  render() {
    const { shoppingCartItems } = this.state;

    const notFound = (
      <div>
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      </div>
    );

    if (shoppingCartItems.length < 1) {
      return notFound;
    }

    const shoppingCartCard = (
      <div>
        {shoppingCartItems.map((product) => (
          <div key={ product.id }>
            <p data-testid="shopping-cart-product-name">{product.title}</p>
            <p>{ `Preço unitário: R$${product.price}` }</p>
            <p>{ `Preço total: R$${product.price * product.quantity}` }</p>
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
        <div>
          <p>
            {`TOTAL: R$${this.showTotalPrice()}`}
            {' '}
          </p>
        </div>
        <Link
          to={ {
            pathname: '/checkout',
            state: { shoppingCartItems },
          } }
          data-testid="checkout-products"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCxnRWU3UzTwR5LtVlg4tpTBGCbZi0SzB2cA&usqp=CAU"
            alt="checkout"
            width="100px"
          />
        </Link>
      </div>
    );

    return shoppingCartItems ? shoppingCartCard : notFound;
  }
}
