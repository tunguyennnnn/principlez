import './collapsemenu.scss';
import React from 'react';

export default function CollapseMenu({ setShow, show }) {
  return (
    <div class="collapse-menu">
      <button onClick={setShow.bind(null, !show)}>button</button>
    </div>
  );
}
