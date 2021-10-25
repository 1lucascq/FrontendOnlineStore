import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import CardProduct from './CardProduct';

export default class SearchProducts extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
      queryResults: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checked' ? target.checked : target.value;

    this.setState({ [name]: value });
  }

  async handleClick() {
    const { query } = this.state;
    const queryResults = await getProductsFromCategoryAndQuery(query);
    this.setState({ queryResults: queryResults.results });
  }

  render() {
    const { query, queryResults } = this.state;
    return (
      <main>
        <section>
          <label htmlFor="query">
            <input
              name="query"
              type="text"
              data-testid="query-input"
              value={ query }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.handleClick }
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
              />))
          ) : (
            <p>Nenhum produto foi encontrado</p>
          )}
        </section>
      </main>
    );
  }
}
