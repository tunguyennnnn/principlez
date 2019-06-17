import './home-menu.scss';
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
      <div class="widget widget-stats bg-gradient-teal m-b-10">
        <div class="stats-icon stats-icon-lg">
          <i class="fa fa-globe fa-fw" />
        </div>
        <div class="stats-content">
          <div class="stats-title">TODAY'S VISITS</div>
          <div class="stats-number">7,842,900</div>
          <div class="stats-progress progress">
            <div class="progress-bar" />
          </div>
          <div class="stats-desc">Better than last week (70.1%)</div>
        </div>
      </div>
    </div>
  );
}

function Authors() {
  return (
    <div className="panel panel-inverse">
      <div className="panel-heading" style={{ background: '#368cbf' }}>
        Authors
      </div>
      <ul className="registered-users-list clearfix">
        <li>
          <Link to="/dashboard/v2">
            <img src="/assets/img/user/user-5.jpg" alt="" />
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
