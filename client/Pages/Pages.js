import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';

const Pages = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Redirect to='/' />
  </Switch>
);

export default Pages;
