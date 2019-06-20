import './header/header.scss';
import React from 'react';
import { Link } from 'react-router-dom';

import User from './header/User';
import SearchForm from './header/SearchForm';

import { PageSettings } from '../config/page-settings.js';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMegaMenu = this.toggleMegaMenu.bind(this);
    this.state = { collapseMegaMenu: false };
  }

  toggleMegaMenu() {
    this.setState({ collapseMegaMenu: !this.state.collapseMegaMenu });
  }
  render() {
    return (
      <PageSettings.Consumer>
        {({ toggleMobileSidebar }) => (
          <div id="header" className="header navbar-default">
            <div className="header-container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">
                  <b>Principlez</b>
                </Link>
              </div>
              <ul className="navbar-nav navbar-right">
                <SearchForm />
                <User />
              </ul>

              <button
                type="button"
                className="navbar-toggle"
                onClick={toggleMobileSidebar}
              >
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
            </div>
          </div>
        )}
      </PageSettings.Consumer>
    );
  }
}

export default Header;
