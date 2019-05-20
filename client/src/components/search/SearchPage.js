import React from 'react';

import SearchResults from './SearchResults';

export default function SearchPage(props) {
  const {
    location: {
      state: { results },
    },
  } = props;
  return (
    <div>
      <h3>Stories or Tags or People</h3>
      <div>here is a complete list of search results</div>
      <SearchResults results={results} limit={results.length} />
    </div>
  );
}
