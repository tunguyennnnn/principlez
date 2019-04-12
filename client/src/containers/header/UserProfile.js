import React from 'react';
import { Image } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

import * as UserId from '../../utils/userId';
import { auth } from '../../services';

function UserProfile({ history }) {
  const { userId, fullname } = auth.userProfile;

  const handleLogout = () => {
    auth.logout();
    history.push('/');
  };

  return (
    <span class="dropdown" style={{ float: 'right' }}>
      <Image
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        avatar
        className="header-image"
      />
      <span class="dropbtn">{fullname}</span>
      <div class="dropdown-content">
        <Link to={`/of/${UserId.generateId(userId, fullname)}`}>
          My Profile
        </Link>
        <Link to={`/of/${UserId.generateId(userId, fullname)}/stories`}>
          My Stories
        </Link>
        <span onClick={handleLogout} className="span-dropdown">
          Sign Out
        </span>
      </div>
    </span>
  );
}

export default withRouter(UserProfile);
