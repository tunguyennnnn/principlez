import './header/header.scss';
import React from 'react';

import User from './header/User';
import Logo from './header/Logo';

export default function Header() {
  return (
    <div className="header-container">
      <div class="topnav">
        <Logo />
        <User />
      </div>
    </div>
  );
}
