import React from 'react';
import { PageSettings } from './config/page-settings.js';

import Header from './containers/Header';
import Sidebar from './containers/SideBar';
import Footer from './containers/Footer';
import Routes from './Routes';

class App extends React.Component {
  constructor(props) {
    super(props);

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
      <PageSettings.Provider value={this.state}>
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
      </PageSettings.Provider>
    );
  }
}

export default App;
