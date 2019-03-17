import './styles/common.scss';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import SignUp from './containers/SignUp';
import StoryPage from './containers/StoryPage';
import Login from './containers/Login';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
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
