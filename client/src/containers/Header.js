import './header/header.scss';
import React from 'react';
import { Menu } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';

import User from './header/User';

export default function Header() {
  return (
    <MediaQuery query="(max-width: 750px)">
      <div className="app-header">
        <div className="header-container">
          <Menu>
            <Menu.Item>
              <a href="/">Home</a>
            </Menu.Item>
            <User />
          </Menu>
        </div>
      </div>
    </MediaQuery>
  );
}
