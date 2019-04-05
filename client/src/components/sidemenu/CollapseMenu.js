import './collapsemenu.scss';
import React from 'react';

export default function CollapseMenu({ setShow, show }) {
  return (
    <div className="collapse-menu">
      <button onClick={setShow.bind(null, !show)}>button</button>
    </div>
  );
}
