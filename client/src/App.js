import React from 'react';
import ReactNotification from 'react-notifications-component';

import { PageSettings } from './config/page-settings.js';

import Header from './containers/Header';
import Footer from './containers/Footer';
import Routes from './Routes';

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
    return (
      <PageSettings.Provider
        value={{ ...this.state, notificationDOMRef: this.notificationDOMRef }}
      >
        <div
          className={
            'fade page-sidebar-fixed show page-container page-header-fixed page-with-top-menu' +
            (this.state.pageSidebar ? '' : 'page-without-sidebar ') +
            (this.state.pageSidebarWide ? 'page-with-wide-sidebar ' : '') +
            (this.state.pageSidebarToggled ? 'page-sidebar-toggled ' : '')
          }
        >
          <Header />
          {/* <Sidebar /> */}
          <Routes />
          <Footer />
        </div>
        <ReactNotification ref={this.notificationDOMRef} />
      </PageSettings.Provider>
    );
  }
}

export default App;
