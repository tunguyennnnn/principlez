import React from 'react';
import { Link } from 'react-router-dom';

import UserProfile from './UserProfile';
import { auth } from '../../services';

function Unauthorized() {
  return (
    <React.Fragment>
      <span>
        <Link to="/login">LOGIN</Link>
      </span>
      <span>
        <Link to="/signup">SIGN UP</Link>
      </span>
    </React.Fragment>
  );
}

function Authorized() {
  return <UserProfile />;
}

export default function User() {
  return (
    <div style={{ float: 'right', position: 'relative' }}>
      {auth.isUserLoginned() ? <Authorized /> : <Unauthorized />}
    </div>
  );
}
