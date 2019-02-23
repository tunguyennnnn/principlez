import './styles/common.scss';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import StoryWrite from './containers/StoryWrite';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/stories/:id" component={StoryWrite} />
        </Switch>
      </div>
    );
  }
}
