import './iconbutton.scss';
import React from 'react';
import { Icon, Popup, Button } from 'semantic-ui-react';

export default function IconButton({
  iconName,
  text,
  action,
  horizontal,
  hoverMode,
  style,
}) {
  const iconComp = <Icon name={iconName} size="large" />;

  if (!horizontal) {
    const children = text ? (
      <Popup trigger={iconComp} content={text} position="left center" />
    ) : (
      iconComp
    );
    return (
      <div className="icon-button" onClick={action} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div className="icon-button" onClick={action} style={style}>
      {iconComp}
      {text}
    </div>
  );
}
