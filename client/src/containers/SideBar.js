import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../config/page-settings.js';

class Sidebar extends React.Component {
  render() {
    return (
      <PageSettings.Consumer>
        {({ toggleMobileSidebar }) => (
          <React.Fragment>
            <div id="sidebar" className="sidebar">
              {this.props.children}
            </div>
            <div
              className="sidebar-mobile-dismiss"
              onClick={toggleMobileSidebar}
            />
          </React.Fragment>
        )}
      </PageSettings.Consumer>
    );
  }
}

export default Sidebar;
