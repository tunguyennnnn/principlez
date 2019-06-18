import './home/homepage.scss';
import React from 'react';

import Body from './home/Body';
import { HomeMenu, Authors } from './home/HomeMenu';

export default function Home() {
  return (
    <div className="home-page-container">
      <HomeMenu />
      <Body />
    </div>
  );
}
