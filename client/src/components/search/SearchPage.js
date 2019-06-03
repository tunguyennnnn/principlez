import React from 'react';

import SearchResults from './SearchResults';

export default function SearchPage(props) {
  const {
    location: { state },
  } = props;
  return (
    <div>
      <h3>Stories or Tags or People</h3>
      <div>here is a complete list of search results</div>
      {!_.isEmpty(state) && (
        <SearchResults results={state.results} limit={state.results.length} />
      )}
    </div>
  );
}
