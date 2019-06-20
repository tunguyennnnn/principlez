import React from 'react';
import ReactNotification from 'react-notifications-component';
import { withRouter } from 'react-router';
import _ from 'lodash';

import { PageSettings } from './config/page-settings.js';

import Header from './containers/Header';
import Footer from './containers/Footer';
import Routes from './Routes';

const NoSideBarRoutes = ['/login', '/signup'];

@withRouter
class App extends React.Component {
  constructor(props) {
    super(props);

    this.notificationDOMRef = React.createRef();

    this.toggleMobileSidebar = e => {
      this.setState(state => ({
        pageSidebarToggled: !this.state.pageSidebarToggled,
      }));
    };

    this.state = {
      pageSidebar: true,
      pageSidebarWide: true,

      pageSidebarToggled: false,

      toggleMobileSidebar: this.toggleMobileSidebar,
    };
  }

  render() {
    const { pathname } = this.props.location;
    const noSidebar = _.includes(NoSideBarRoutes, pathname);

    return (
      <PageSettings.Provider
        value={{ ...this.state, notificationDOMRef: this.notificationDOMRef }}
      >
        <div
          className={
            'fade page-sidebar-fixed show page-container page-header-fixed ' +
            (!noSidebar && this.state.pageSidebar
              ? ''
              : 'page-without-sidebar ') +
            (!noSidebar && this.state.pageSidebarWide
              ? 'page-with-wide-sidebar '
              : '') +
            (this.state.pageSidebarToggled ? 'page-sidebar-toggled ' : '')
          }
        >
          <Header />
          {/* <Sidebar /> */}
          <Routes />
          {!noSidebar && <Footer />}
        </div>
        <ReactNotification ref={this.notificationDOMRef} />
      </PageSettings.Provider>
    );
  }
}

export default App;
