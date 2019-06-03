import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import SignUp from './containers/SignUp';
import StoryPage from './containers/StoryPage';
import Login from './containers/Login';
import ReadPage from './containers/ReadPage';
import ProfilePage from './containers/ProfilePage';
import PersonalDevPage from './containers/PersonalDevPage';
import SearchPage from './components/search/SearchPage';
import { PageSettings } from './config/page-settings.js';

export default class AppRoutes extends React.Component {
  render() {
    return (
      <PageSettings.Consumer>
        {({ pageContentFullWidth, pageContentClass, notificationDOMRef }) => (
          <div
            className={
              'content ' +
              (pageContentFullWidth
                ? 'content-full-width '
                : '' + pageContentClass)
            }
          >
            <Switch>
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={Login} />
              <Route
                exact
                path="/"
                component={props => (
                  <div id="app-body">
                    <Home {...props} />
                  </div>
                )}
              />
              <Route
                exact
                path="/of/me"
                component={props => (
                  <PersonalDevPage
                    {...props}
                    notificationDOMRef={notificationDOMRef}
                  />
                )}
              />
              <Route
                exact
                path="/of/:name"
                component={props => (
                  <div id="app-body">
                    <ProfilePage {...props} />
                  </div>
                )}
              />
              <Route
                exact
                path="/of/:name/stories/:chapterId"
                component={props => (
                  <div id="app-body">
                    <StoryPage {...props} />
                  </div>
                )}
              />
              <Route
                exact
                path="/of/:name/stories"
                component={props => (
                  <div id="app-body">
                    <ReadPage {...props} />
                  </div>
                )}
              />
              <Route
                exact
                path="/search"
                component={props => (
                  <div id="app-body">
                    <SearchPage {...props} />
                  </div>
                )}
              />
            </Switch>
          </div>
        )}
      </PageSettings.Consumer>
    );
  }
}
