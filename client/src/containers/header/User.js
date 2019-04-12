import React from 'react';
import { Link } from 'react-router-dom';

import UserProfile from './UserProfile';
import { auth } from '../../services';

function Unauthorized() {
  return (
    <React.Fragment>
      <span style={{ float: 'right' }}>
        <Link to="/login">LOGIN</Link>
      </span>
      <span style={{ float: 'right' }}>
        <Link to="/signup">SIGN UP</Link>
      </span>
    </React.Fragment>
  );
}

function Authorized() {
  return (
    <React.Fragment>
      <UserProfile />
    </React.Fragment>
  );
}

export default function User() {
  return auth.isUserLoginned() ? <Authorized /> : <Unauthorized />;
}
