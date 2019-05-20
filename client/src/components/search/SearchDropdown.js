import React from 'react';
import _ from 'lodash';

import SearchResults from './SearchResults';

const limit = 3;

export default function SearchDropdown(props) {
  const { results, searchText } = props;
  return (
    <div className="search-dropdown-container">
      <li>Searching for '{searchText}'</li>
      <SearchResults results={results} limit={limit} />
    </div>
  );
}
