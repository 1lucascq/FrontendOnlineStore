import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from './services/api';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import DetailProduct from './pages/DetailProduct';
import checkout from './pages/checkout';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      query: '',
      queryResults: [],
      categorieId: '',
      emailReview: '',
      radioReview: '',
      textAreaReview: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    const {
      queryResults,
      emailReview,
      radioReview,
      textAreaReview } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Home
              handleClick={ this.handleClick }
              handleChange={ this.handleChange }
              queryResults={ queryResults }
            />) }
          />
          <Route
            exact
            path="/shoppingCart"
            component={ ShoppingCart }
          />
          <Route
            exact
            path="/detailProduct/:id"
            render={ (props) => (<DetailProduct
              queryResults={ queryResults }
              { ... props }
              handleChange={ this.handleChange }
              emailReview={ emailReview }
              radioReview={ radioReview }
              textAreaReview={ textAreaReview }
            />) }
          />
          <Route
            exact
            path="/checkout"
            component={ checkout }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
