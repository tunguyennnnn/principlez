import './header/header.scss';
import React from 'react';
import { Menu } from 'semantic-ui-react';
import Logo from './header/Logo';
import User from './header/User';

export default function Header() {
  return (
    <div class="app-header">
      <div class="header-container">
        <Menu>
          <Menu.Item name="home" />
          <User />
        </Menu>
      </div>
    </div>
  );
}
