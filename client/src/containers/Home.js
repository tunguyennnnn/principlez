import './home/homepage.scss';
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import Body from './home/Body';
import HomeMenu from './home/HomeMenu';

export default class Home extends Component {
  render() {
    return (
      <div class="home-page-container">
        <MediaQuery query="(min-width: 650px)">
          <div class="home-menu-grid">
            <HomeMenu />
          </div>
        </MediaQuery>
        <div class="home-page-body">
          <Body />
        </div>
      </div>
    );
  }
}
