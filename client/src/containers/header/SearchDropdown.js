import React from 'react';
import _ from 'lodash';

import {
  UserSearchResult,
  TagSearchResult,
  StorySearchResult,
} from '../../components/search/';

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

function showResultsByType(results) {
  return _.map(results, (value, type) => {
    if (_.isEmpty(value)) return;
    const Component = Mapper[type];
    return <Component key={type} results={value} />;
  });
}

export default function SearchDropdown(props) {
  const { results, searchText } = props;
  const newResults = organizeResultsByType(results);
  return (
    <div className="dropdown-menu-container">
      <h4>Search for '{searchText}'</h4>
      {showResultsByType(newResults)}
    </div>
  );
}
