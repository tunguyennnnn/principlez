import './home-menu.scss';
import LogoImage from '../../assets/image-medium.png';
import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../services';
import { Icon, Image } from 'semantic-ui-react';

function Actions() {
  return (
    <ul className="action-list">
      <li className="home-intruction-layout">
        <Link to={auth.userProfileLink}>
          <Icon name="home" />
          {' My Profile'}
        </Link>
      </li>
      <li className="home-intruction-layout">
        <Link to={auth.userStoriesLink}>
          <Icon name="pencil alternate" />
          {' Write my stories'}
        </Link>
      </li>
      <li className="home-intruction-layout">
        <a>
          <Icon name="sticky note outline" />
          {' New Stories'}
        </a>
      </li>
      <li className="home-intruction-layout">
        <a>
          <Icon name="street view" />
          {' Writers Around Me'}
        </a>
      </li>
    </ul>
  );
}

function Channels() {
  return (
    <div className="channel-container home-intruction-layout">
      <div className="channels">
        <Icon name="youtube" className="channel" />
        <Icon name="facebook" className="channel" />
        <Icon name="meetup" className="channel" />
      </div>
    </div>
  );
}

function PrinciplezIntro() {
  return (
    <div className="introduction home-intruction-layout">
      <p className="head">Principlez of successful people</p>
      <p className="body">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut
      </p>
    </div>
  );
}

export default function HomeMenu() {
  return (
    <div className="home-menu-container">
      <PrinciplezIntro />
      <Actions />
      <Channels />
    </div>
  );
}
