import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
      <blockquote>
        <small>
          Pain + Reflection = Progress
          <cite title="Source Title"> Ray Dalio, Principles</cite>
        </small>
      </blockquote>
      <blockquote>
        <small>
          It is far more common for people to allow ego to stand in the way of
          learning.
          <br />
          <cite title="Source Title"> Ray Dalio, Principles</cite>
        </small>
      </blockquote>
    </div>
  );
}

export default function HomeMenu() {
  return (
    <div className="home-menu-container">
      <PrinciplezIntro />
      <Channels />
    </div>
  );
}
