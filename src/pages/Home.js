import React, { Component } from 'react';
import Categories from '../components/Categories';
import Cart from '../components/Cart';
import SearchProducts from '../components/SearchProducts';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
      queryResults: [],
      categorieId: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checked' ? target.checked : target.value;

    if (target.value) {
      this.setState({ [name]: value });
    }
    if (target.checked) {
      this.setState({ [name]: value }, () => this.handleClick());
    }
  }

  async handleClick() {
    const { query, categorieId } = this.state;
    const queryResults = await getProductsFromCategoryAndQuery(query, categorieId);
    this.setState({ queryResults: queryResults.results });
  }

  render() {
    const { query, queryResults } = this.state;
    return (
      <div data-testid="home-initial-message">
        <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
        <SearchProducts
          query={ query }
          queryResults={ queryResults }
          handleChange={ this.handleChange }
          handleClick={ this.handleClick }
        />
        <Cart />
        <Categories handleChange={ this.handleChange } />
      </div>

    );
  }
}
