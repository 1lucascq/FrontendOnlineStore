import React, { Component } from 'react';
import PropTypes from 'prop-types';
import boleto from '../image/boleto.png';
import visa from '../image/visa.png';
import elo from '../image/elo.png';

export default class checkout extends Component {
  constructor() {
    super();
    this.showTotalPrice = this.showTotalPrice.bind(this);
  }

  showTotalPrice() {
    const { location: { state: { shoppingCartItems } } } = this.props;
    const totalPrice = shoppingCartItems
      .map((product) => product.price * product.quantity);
    const allProductsPrices = totalPrice.reduce((acc, current) => acc + current);
    return allProductsPrices;
  }

  render() {
    const { location: { state: { shoppingCartItems } } } = this.props;
    const checkoutCard = (
      <div>
        {shoppingCartItems.map((product) => (
          <div key={ product.id }>
            <p data-testid="shopping-cart-product-name">{product.title}</p>
            <p>{ `Preço unitário: R$${product.price}` }</p>
            <p>{ `Preço total: R$${product.price * product.quantity}` }</p>
          </div>
        ))}
        <div>
          <p>
            {`TOTAL: R$${this.showTotalPrice()}`}
            {' '}
          </p>
        </div>
      </div>
    );
    return (
      <div>
        <section>
          { checkoutCard }
        </section>
        <section>
          <form>
            <input
              type="text"
              placeholder="Nome completo"
              data-testid="checkout-fullname"
            />
            <input
              type="email"
              placeholder="Email"
              data-testid="checkout-email"
            />
            <input
              type="string"
              placeholder="CPF"
              data-testid="checkout-cpf"
            />
            <input
              type="string"
              placeholder="Telefone"
              data-testid="checkout-phone"
            />
            <input
              type="string"
              placeholder="CEP"
              data-testid="checkout-cep"
            />
            <input
              type="text"
              placeholder="Endereço"
              data-testid="checkout-address"
            />
          </form>
        </section>
        <section>
          <form>
            <label htmlFor="boleto">
              Boleto
              <input name="boleto" type="checkbox" />
              <img
                width="80px"
                name="boleto"
                src={ boleto }
                alt="boleto"
              />
            </label>
            <label htmlFor="cartoes">
              Cartão de crédito
              <input name="cartoes" type="checkbox" />
              <img
                width="80px"
                name="cartoes"
                src={ visa }
                alt="cartoes"
              />
              <input name="cartoes" type="checkbox" />
              <img
                width="80px"
                name="cartoes"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwNlGtlcgUSE2pS6enHB9m66tTUG2ubFyEYg&usqp=CAU"
                alt="cartoes"
              />
              <input name="cartoes" type="checkbox" />
              <img
                width="80px"
                name="cartoes"
                src={ elo }
                alt="cartoes"
              />
            </label>
          </form>
          <button type="submit">Comprar</button>
        </section>
      </div>
    );
  }
}

checkout.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      shoppingCartItems: PropTypes.shape(PropTypes.object),
    }),
  }).isRequired,
};
