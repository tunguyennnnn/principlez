import './home/homepage.scss';
import React from 'react';
import MediaQuery from 'react-responsive';

import Body from './home/Body';
import HomeMenu from './home/HomeMenu';
import TopHomeMenu from './home/TopHomeMenu';
import Authors from './home/Authors';

export default function Home() {
  console.log('rendering home');
  return (
    <div className="home-page-container">
      <MediaQuery query="(min-width: 801px)">
        <div className="side-menu-grid">
          <HomeMenu />
        </div>
      </MediaQuery>
      <MediaQuery query="(max-width: 800px)">
        <TopHomeMenu />
      </MediaQuery>
      <div className="home-page-body">
        <Body />
      </div>
      <MediaQuery query="(min-width: 900px)">
        <div className="home-page-right">
          <Authors />
        </div>
      </MediaQuery>
    </div>
  );
}
