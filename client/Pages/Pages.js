import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Cart from './Cart';
import Details from './Details';

const Pages = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/cart" component={Cart} />
    <Route path="/details/:id" component={Details} />
    <Redirect to="/" />
  </Switch>
);

export default Pages;
