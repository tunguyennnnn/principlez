import './home-menu.scss';
import LogoImage from '../../assets/image-medium.png';
import React from 'react';
import { Icon, Image } from 'semantic-ui-react';
import Actions from './Actions';

function Channels() {
  return (
    <div className="channel-container common-layout">
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
    <div className="introduction common-layout">
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
