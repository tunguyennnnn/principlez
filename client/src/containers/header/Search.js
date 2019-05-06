import './header.scss';

import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import SearchResultsDropdown from './SearchResultsDropdown';

import SearchResultsDropdown from './SearchResultsDropdown';

function Search(props) {
  const [isSearching, setSearchInput] = useState(false);
  const [text, setText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const input = new Subject();

  const clickToShowSearchInput = () => {
    if (!isSearching) {
      setSearchInput(true);
    }
  };

  const _executeSearch = async () => {
    try {
      const result = await props.client.query({
        query: searchQuery,
        variables: { text },
        fetchPolicy: 'no-cache',
      });
      const {
        data: { search },
      } = result;
      console.log(search);
      setSearchResults(search);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = event => {
    const { value } = event.target;
    input.next();
    setText(value);
  };

  useEffect(() => {
    input.pipe(debounceTime(3000)).subscribe(_executeSearch);
    return () => {
      input.unsubscribe();
    };
  }, [text]);

  return (
    <div className="search-field-container">
      <Icon
        name="search"
        size="large"
        color="grey"
        onClick={clickToShowSearchInput}
      />
      {isSearching && (
        <div className="search-form-container">
          <form onSubmit={_executeSearch}>
            <input
              type="text"
              placeholder="Search Principlez"
              onChange={e => setText(e.target.value)}
            />
          </form>
          {/* {!_.isEmpty(searchResults) && (
            <SearchResultsDropdown results={searchResults} />
          )} */}
        </div>
      )}
    </div>
  );
}

const searchQuery = gql`
  query searchQuery($text: String!) {
    search(text: $text) {
      ... on StorySearchResult {
        id
        title
        body
      }
      ... on UserSearchResult {
        id
        fullname
      }
    }
  }
`;

export default withApollo(Search);
