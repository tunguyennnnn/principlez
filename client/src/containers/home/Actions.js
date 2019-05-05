import './actions.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import { auth } from '../../services';

export default function Actions({ horizontal }) {
  const className = horizontal ? 'horizontal' : '';
  return (
    <ul className={`action-list ${horizontal && 'horizontal'}`}>
      <li className={className}>
        <a>
          <Icon name="sticky note outline" />
          {'Popular stories'}
        </a>
      </li>
      <li className={className}>
        <a>
          <Icon name="street view" />
          {'Writers Around Me'}
        </a>
      </li>
    </ul>
  );
}
