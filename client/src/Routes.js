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
          <div className="content content-full-width">
            <Switch>
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/of/me/notes/:noteId"
                component={props => <NotePage {...props} />}
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
              <Route exact path="/of/:name" component={ProfilePage} />
              <Route
                exact
                path="/of/:name/stories/:chapterId"
                component={props => <StoryPage {...props} />}
              />
              <Route
                exact
                path="/of/:name/stories"
                component={props => <ReadPage {...props} />}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        )}
      </PageSettings.Consumer>
    );
  }
}
