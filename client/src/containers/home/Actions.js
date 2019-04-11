import './actions.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import { auth } from '../../services';

export default function Actions({ horizontal }) {
  return (
    <ul className={`action-list ${horizontal && 'horizontal'}`}>
      <li className={`common-layout ${horizontal && 'horizontal'}`}>
        <Link to={auth.userProfileLink}>
          <Icon name="home" />
          {' My Profile'}
        </Link>
      </li>
      <li className={`common-layout ${horizontal && 'horizontal'}`}>
        <Link to={auth.userStoriesLink}>
          <Icon name="pencil alternate" />
          {' Write my stories'}
        </Link>
      </li>
      <li className={`common-layout ${horizontal && 'horizontal'}`}>
        <a>
          <Icon name="sticky note outline" />
          {' New Stories'}
        </a>
      </li>
      <li className={`common-layout ${horizontal && 'horizontal'}`}>
        <a>
          <Icon name="street view" />
          {' Writers Around Me'}
        </a>
      </li>
    </ul>
  );
}
