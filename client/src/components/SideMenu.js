import React, { useState } from 'react';
import CollapseMenu from './sidemenu/CollapseMenu';

export default function SideMenu({ children }) {
  const [show, setShow] = useState(false);
  if (!show) {
    return <CollapseMenu setShow={setShow} show={show} />;
  }
  return <div className="open-menu">{children}</div>;
}
