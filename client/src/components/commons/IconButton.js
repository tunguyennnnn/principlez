import './iconbutton.scss';
import React, { useState } from 'react';
import { Icon, Popup } from 'semantic-ui-react';

export default function IconButton({ iconName, text, action }) {
  const iconComp = <Icon name={iconName} />;
  const children = text ? (
    <Popup trigger={iconComp} content={text} position="left center" />
  ) : (
    iconComp
  );
  return <div class="icon-button">{children}</div>;
}
