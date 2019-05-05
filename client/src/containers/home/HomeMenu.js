import './home-menu.scss';
import LogoImage from '../../assets/image-medium.png';
import React from 'react';
import { Icon, Image } from 'semantic-ui-react';
import Actions from './Actions';

function Channels() {
  return (
    <div className="channel-container">
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
    <div className="introduction">
      <p className="head">Stories and work principles of people arround you</p>
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
