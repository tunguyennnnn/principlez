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

export function Authors() {
  return (
    <div className="home-authors-container">
      <div className="panel panel-inverse">
        <div className="panel-heading">Authors</div>
        <ul className="registered-users-list clearfix">
          <li>
            <Link to="/dashboard/v2">
              <img
                src="https://image.shutterstock.com/image-photo/glitter-vintage-lights-background-gold-260nw-226746934.jpg"
                alt=""
              />
            </Link>
            <h4 className="username text-ellipsis">
              Savory Posh
              <small>Algerian</small>
            </h4>
          </li>
        </ul>
        <div className="panel-footer ">
          <Link to="/users" className="text-inverse">
            View All
          </Link>
        </div>
      </div>
    </div>
  );
}

export function HomeMenu() {
  return (
    <div className="home-menu-container">
      <PrinciplezIntro />
      <Channels />
    </div>
  );
}
