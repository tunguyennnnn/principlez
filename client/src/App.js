import React from 'react';
import ReactNotification from 'react-notifications-component';
import { withRouter } from 'react-router';
import _ from 'lodash';

import { PageSettings } from './config/page-settings.js';

import Header from './containers/Header';
import Footer from './containers/Footer';
import Routes from './Routes';

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

    this.handleSetPageSidebar = value => {
      this.setState(state => ({
        pageSidebar: value,
      }));
    };

    this.handleSetPageHeader = value => {
      this.setState(state => ({
        pageHeader: value,
      }));
    };

    this.state = {
      pageHeader: true,
      pageSidebar: true,
      pageSidebarWide: true,

      pageSidebarToggled: false,

      handleSetPageHeader: this.handleSetPageHeader,
      handleSetPageSidebar: this.handleSetPageSidebar,
      toggleMobileSidebar: this.toggleMobileSidebar,
    };
  }

  render() {
    const { pathname } = this.props.location;

    return (
      <PageSettings.Provider
        value={{ ...this.state, notificationDOMRef: this.notificationDOMRef }}
      >
        <div
          className={
            'fade page-sidebar-fixed show page-container ' +
            (this.state.pageHeader ? 'page-header-fixed ' : '') +
            (this.state.pageSidebar ? '' : 'page-without-sidebar ') +
            (this.state.pageSidebar ? 'page-with-wide-sidebar ' : '') +
            (this.state.pageSidebarToggled ? 'page-sidebar-toggled ' : '')
          }
        >
          {this.state.pageHeader && <Header />}
          {/* <Sidebar /> */}
          <Routes />
          {/* {!noSidebar && <Footer />} */}
        </div>
        <ReactNotification ref={this.notificationDOMRef} />
      </PageSettings.Provider>
    );
  }
}

export default App;
