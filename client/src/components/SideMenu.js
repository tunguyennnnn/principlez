import './sidemenu/sidemenu.scss';
import React, { useState } from 'react';
import Sidebar from 'react-sidebar';
import { Icon } from 'semantic-ui-react';

import Header from './sidemenu/Header';

const commonStyles = {
  paddingTop: 80,
};

export default function SideMenu({ menuComp, contentComp, headerTitle }) {
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
      open={open}
      onSetOpen={setOpenState.bind(null, false)}
      styles={{
        sidebar: { background: 'white', zIndex: 10000, overflowY: 'hidden' },
      }}
    >
      <div style={commonStyles}>
        <div className="side-menu-triggerer">
          <Icon name="tasks" onClick={() => setOpenState(true)} />
        </div>
        {contentComp(setOpenState)}
      </div>
    </Sidebar>
  );
}
