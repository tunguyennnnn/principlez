import React from 'react';

import {
  UserSearchResult,
  TagSearchResult,
  StorySearchResult,
} from './searchresult/';

import * as SearchResultsHelper from '../../utils/search-results-helper';

const Mapper = {
  UserSearchResult: UserSearchResult,
  StorySearchResult: StorySearchResult,
  TagSearchResult: TagSearchResult,
};

function divideResultsByType(results, limit) {
  return _.map(results, (value, type) => {
    if (_.isEmpty(value)) return;
    const Component = Mapper[type];
    return <Component key={type} results={value} limit={limit} />;
  });
}

export default function SearchResults({ results, limit }) {
  const newResults = SearchResultsHelper.organizeResultsByType(results);
  if (_.isEmpty(newResults)) return null;
  return <div>{divideResultsByType(newResults, limit)}</div>;
}
