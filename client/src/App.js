import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import BlogWrite from './containers/BlogWrite';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <Switch>
          <Route exact path="/blogs/:id" component={BlogWrite} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}
