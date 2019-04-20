import './sidemenu/sidemenu.scss';
import React, { useState } from 'react';
import Sidebar from 'react-sidebar';
import { Icon } from 'semantic-ui-react';

import Header from './sidemenu/Header';

const commonStyles = {
  height: window.innerHeight,
  paddingTop: 80,
};

export default function SideMenu({
  menuComp,
  contentComp,
  headerTitle,
  triggerTitle,
}) {
  const [open, setOpenState] = useState(false);
  return (
    <Sidebar
      sidebar={
        <div>
          <Header title={headerTitle} />
          {menuComp}
        </div>
      }
      touch
      transitions
      open={open}
      onSetOpen={setOpenState.bind(null, false)}
      styles={{
        sidebar: { background: 'white', zIndex: 10000, overflowY: 'hidden' },
      }}
    >
      <div style={commonStyles} ref={el => (window.sidemenu = el)}>
        <div className="side-menu-triggerer" onClick={() => setOpenState(true)}>
          {triggerTitle ? triggerTitle : <Icon name="tasks" />}
        </div>
        <div
          id="stories-container"
          style={{ height: '100%', overflowY: 'scroll' }}
        >
          {contentComp(setOpenState)}
        </div>
      </div>
    </Sidebar>
  );
}
