import './home/homepage.scss';
import React from 'react';
import MediaQuery from 'react-responsive';

import Body from './home/Body';
import HomeMenu from './home/HomeMenu';

export default function Home() {
  return (
    <div className="home-page-container">
      <MediaQuery query="(min-width: 750px)">
        <div className="side-menu-grid">
          <HomeMenu />
        </div>
      </MediaQuery>
      <div className="home-page-body">
        <Body />
      </div>
    </div>
  );
}
