import React from 'react';
import _ from 'lodash';
import { Link, withRouter } from 'react-router-dom';

import * as UserId from '../../utils/userId';
import { auth } from '../../services';

// TODO: dropdown isn't visible in mobile view
function HeaderDropdown(props) {
  const { history } = props;
  const { userId, fullname } = auth.userProfile;

  const handleLogout = () => {
    auth.logout();
    history.push('/');
  };

  return (
    <div className="header-dropdown-container">
      <li>
        <Link to={`/of/${UserId.generateId(userId, fullname)}/stories`}>
          Stories
        </Link>
      </li>
      <li>
        <Link to={`/of/${UserId.generateId(userId, fullname)}`}>Profile</Link>
      </li>
      <li onClick={handleLogout}>
        <a href="#">Sign Out</a>
      </li>
    </div>
  );
}

export default withRouter(HeaderDropdown);
