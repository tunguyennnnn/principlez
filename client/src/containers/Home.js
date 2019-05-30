import './home/homepage.scss';
import React from 'react';

import Body from './home/Body';
import HomeMenu from './home/HomeMenu';
import TopHomeMenu from './home/TopHomeMenu';
import Authors from './home/Authors';
import Sidebar from './SideBar';

export default function Home() {
  return (
    <div className="home-page-container">
      <Sidebar>
        <HomeMenu />
      </Sidebar>
      <Body />
    </div>
  );
}
