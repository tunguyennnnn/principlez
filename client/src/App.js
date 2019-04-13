import './styles/common.scss';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './containers/Header';
import Home from './containers/Home';
import SignUp from './containers/SignUp';
import StoryPage from './containers/StoryPage';
import Login from './containers/Login';
import ReadPage from './containers/ReadPage';
import ProfilePage from './containers/ProfilePage';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <Header />
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <div id="app-body">
            <Route exact path="/" component={Home} />
            <Route exact path="/of/:name" component={ProfilePage} />
            <Route
              exact
              path="/of/:name/stories/:chapterId"
              component={StoryPage}
            />
            <Route exact path="/of/:name/stories" component={ReadPage} />
          </div>
        </Switch>
      </div>
    );
  }
}
