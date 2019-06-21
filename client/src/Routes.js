import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from './containers/PageNotFound';
import Home from './containers/Home';
import SignUp from './containers/SignUp';
import StoryPage from './containers/StoryPage';
import Login from './containers/Login';
import ReadPage from './containers/ReadPage';
import ProfilePage from './containers/ProfilePage';
import PersonalDevPage from './containers/PersonalDevPage';
import NotePage from './containers/NotePage';
import { PageSettings } from './config/page-settings.js';

export default class AppRoutes extends React.Component {
  render() {
    return (
      <PageSettings.Consumer>
        {({ notificationDOMRef }) => (
          <Switch>
            <Route
              exact
              path="/signup"
              component={props => (
                <div className="content content-full-width">
                  <SignUp {...props} notificationDOMRef={notificationDOMRef} />
                </div>
              )}
            />
            <Route
              exact
              path="/login"
              component={props => (
                <div className="content content-full-width">
                  <Login {...props} notificationDOMRef={notificationDOMRef} />
                </div>
              )}
            />
            <Route
              exact
              path="/"
              component={props => (
                <div className="content">
                  <Home {...props} />
                </div>
              )}
            />
            <Route
              exact
              path="/of/me/notes/:noteId"
              component={props => (
                <div className="content">
                  <NotePage {...props} />
                </div>
              )}
            />
            <Route
              exact
              path="/of/me"
              component={props => (
                <div className="content">
                  <PersonalDevPage
                    {...props}
                    notificationDOMRef={notificationDOMRef}
                  />
                </div>
              )}
            />
            <Route
              exact
              path="/of/:name"
              component={props => (
                <div className="content">
                  <ProfilePage {...props} />
                </div>
              )}
            />
            <Route
              exact
              path="/of/:name/stories/:chapterId"
              component={props => (
                <div className="content">
                  <StoryPage {...props} />
                </div>
              )}
            />
            <Route
              exact
              path="/of/:name/stories"
              component={props => (
                <div className="content">
                  <ReadPage {...props} />
                </div>
              )}
            />
            <Route component={NotFoundPage} />
          </Switch>
        )}
      </PageSettings.Consumer>
    );
  }
}
