import React from 'react';
import { Menu } from 'semantic-ui-react';

import UserProfile from './UserProfile';
import { auth } from '../../services';

function Unauthorized() {
  return (
    <React.Fragment>
      <Menu.Item name="Login" />
      <Menu.Item name="Signup" />
    </React.Fragment>
  );
}

function Authorized() {
  return (
    <React.Fragment>
      <UserProfile />
      <Menu.Item name="Signout" />
    </React.Fragment>
  );
}

export default function User() {
  const children = auth.isUserLoginned() ? <Authorized /> : <Unauthorized />;
  return <Menu.Menu position="right">{children}</Menu.Menu>;
}
