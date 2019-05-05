import './header.scss';

import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';

export default function SearchField() {
  const [isSearching, setSearchField] = useState(false);

  const onClick = () => {
    if (!isSearching) {
      setSearchField(true);
    }
  };

  return (
    <div className="search-field-container">
      <Icon name="search" size="large" color="grey" onClick={onClick} />
      {isSearching && <input placeholder="Search Principlez" />}
    </div>
  );
}
