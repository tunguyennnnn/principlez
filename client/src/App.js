import './styles/common.scss';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import StoryPage from './containers/StoryPage';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/of/:name"
            component={() => <div>Personal page</div>}
          />
          <Route path="/of/:name/stories/:chapterId" component={StoryPage} />
        </Switch>
      </div>
    );
  }
}
