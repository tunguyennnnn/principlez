import './home/homepage.scss';
import React from 'react';

import Body from './home/Body';
import HomeMenu from './home/HomeMenu';
import Authors from './home/Authors';
import Sidebar from './SideBar';

export default function Home() {
  return (
    <div className="home-page--container">
      <Sidebar>
        <HomeMenu />
      </Sidebar>
      <div className="row">
        <div className="col-lg-4 col-md-12 author--container">
          <Authors />
        </div>
        <div className="col-lg-8 col-md-12 body--container">
          <Body />
        </div>
      </div>
    </div>
  );
}
