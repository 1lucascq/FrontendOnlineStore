import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/pages/Home';
import ShoppingCart from './components/pages/ShoppingCart';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/shoppingCart" component={ ShoppingCart } />
        </Switch>
      </BrowserRouter>
    );
  }
}
