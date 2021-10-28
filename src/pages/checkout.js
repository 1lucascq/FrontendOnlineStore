import React, { Component } from 'react';
import boleto from '../image/boleto.png';
import visa from '../image/visa.png';
import elo from '../image/elo.png';

export default class checkout extends Component {
  render() {
    return (
      <div>
        <section>
          <h1>info produtos</h1>
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
