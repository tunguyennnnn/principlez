import './header.scss';

import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';

function Search(props) {
  const [isSearching, setSearchInput] = useState(false);
  const [text, setText] = useState('');
  const [searchResults, setsearchResults] = useState([]);

  const clickToShowSearchInput = () => {
    if (!isSearching) {
      setSearchInput(true);
    }
  };

  const _executeSearch = async event => {
    try {
      event.preventDefault();
      const result = await props.client.query({
        query: searchQuery,
        variables: { text },
        fetchPolicy: 'no-cache',
      });
      console.log('result', result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="search-field-container">
      <Icon
        name="search"
        size="large"
        color="grey"
        onClick={clickToShowSearchInput}
      />
      {isSearching && (
        <form className="search-form-container" onSubmit={_executeSearch}>
          <input
            type="text"
            placeholder="Search Principlez"
            onChange={e => setText(e.target.value)}
          />
        </form>
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
