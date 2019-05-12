import React from 'react';
import _ from 'lodash';

import {
  UserSearchResult,
  TagSearchResult,
  StorySearchResult,
} from './searchresult/';

const Mapper = {
  UserSearchResult: UserSearchResult,
  StorySearchResult: StorySearchResult,
  TagSearchResult: TagSearchResult,
};

function organizeResultsByType(results) {
  return _.reduce(
    results,
    (result, value) => {
      if (!_.isEmpty(value)) {
        const { __typename } = value;
        (result[__typename] || (result[__typename] = [])).push(value);
        return result;
      }
    },
    {},
  );
}

function showResultsByType(results, searchText) {
  return _.map(results, (value, type) => {
    if (_.isEmpty(value)) return;
    const Component = Mapper[type];
    return <Component key={type} results={value} searchText={searchText} />;
  });
}

export default function SearchDropdown(props) {
  const { results, searchText } = props;
  const newResults = organizeResultsByType(results);
  return (
    <div className="search-dropdown-container">
      <h4>Searching for '{searchText}'</h4>
      {showResultsByType(newResults, searchText)}
    </div>
  );
}
