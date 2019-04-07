import './home/homepage.scss';
import React from 'react';
import MediaQuery from 'react-responsive';

import Body from './home/Body';
import HomeMenu from './home/HomeMenu';
import TopHomeMenu from './home/TopHomeMenu';

export default function Home() {
  return (
    <div className="home-page-container">
      <MediaQuery query="(min-width: 1000px)">
        <div className="side-menu-grid">
          <HomeMenu />
        </div>
      </MediaQuery>
      <MediaQuery query="(max-width: 1000px)">
        <TopHomeMenu />
      </MediaQuery>
      <div className="home-page-body">
        <Body />
      </div>
    </div>
  );
}
