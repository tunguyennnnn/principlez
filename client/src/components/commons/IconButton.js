import './iconbutton.scss';
import React from 'react';
import { Icon, Popup, Button } from 'semantic-ui-react';

export default function IconButton({ iconName, text, action, horizontal }) {
  const iconComp = <Icon name={iconName} size="large" />;

  if (!horizontal) {
    const children = text ? (
      <Popup trigger={iconComp} content={text} position="left center" />
    ) : (
      iconComp
    );
    return (
      <div className="icon-button" onClick={action}>
        {children}
      </div>
    );
  }

  const children = (
    <React.Fragment>
      {iconComp}
      {text}
    </React.Fragment>
  );

  return (
    <div className="icon-button" onClick={action}>
      {children}
    </div>
  );
}
