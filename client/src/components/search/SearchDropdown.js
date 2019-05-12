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

const limit = 3;

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

function divideResultsByType(results) {
  return _.map(results, (value, type) => {
    if (_.isEmpty(value)) return;
    const Component = Mapper[type];
    return <Component key={type} results={value} limit={limit} />;
  });
}

export default function SearchDropdown(props) {
  const { results, searchText } = props;
  const newResults = organizeResultsByType(results);
  return (
    <div className="search-dropdown-container">
      <li>Searching for '{searchText}'</li>
      {divideResultsByType(newResults)}
      {_.size(results) > limit && (
        <li style={{ textAlign: 'center' }}>See more results</li>
      )}
    </div>
  );
}
