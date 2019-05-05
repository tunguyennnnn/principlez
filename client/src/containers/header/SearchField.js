import './header.scss';

import React from 'react';
import { Icon } from 'semantic-ui-react';

export default function SearchField() {
  return (
    <div className="search-field-container">
      <Icon name="search" size="large" color="grey" />
      {/* <input /> */}
    </div>
  );
}
