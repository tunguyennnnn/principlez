import React, { useState } from 'react';
import Sidebar from 'react-sidebar';

const commonStyles = {
  paddingTop: 80,
};

export default function SideMenu({ menuComp, contentComp }) {
  const [open, setOpenState] = useState(false);
  return (
    <Sidebar
      sidebar={<div style={commonStyles}>{menuComp}</div>}
      open={open}
      onSetOpen={setOpenState.bind(null, false)}
      styles={{ sidebar: { background: 'white' } }}
    >
      <div style={commonStyles}>{contentComp(setOpenState)}</div>
    </Sidebar>
  );
}
