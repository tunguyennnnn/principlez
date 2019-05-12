import './header.scss';

import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import SearchDropdown from './SearchDropdown';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearching: false,
      text: '',
      searchResults: [],
    };

    this.input = new Subject().pipe(debounceTime(1000));
    this.input.subscribe(this._executeSearch);
  }

  clickToShowSearchInput = () => {
    if (!this.state.isSearching) {
      this.setState({ isSearching: true });
    }
  };

  _executeSearch = async () => {
    try {
      const { text } = this.state;
      const result = await this.props.client.query({
        query: searchQuery,
        variables: { text },
        fetchPolicy: 'no-cache',
      });
      const {
        data: { search },
      } = result;
      this.setState({ ...this.state, searchResults: search });
    } catch (error) {
      console.log(error);
    }
  };

  onChange = event => {
    const { value } = event.target;
    this.input.next();
    this.setState({ text: value });
  };

  render() {
    const { isSearching, searchResults } = this.state;
    return (
      <div className="search-field-container">
        <Icon
          name="search"
          size="large"
          color="grey"
          onClick={this.clickToShowSearchInput}
        />
        {isSearching && (
          <div className="search-form-container">
            <form>
              <input
                type="text"
                placeholder="Search Principlez"
                onChange={this.onChange}
                autoFocus
              />
            </form>
            {!_.isEmpty(searchResults) && (
              <SearchDropdown results={searchResults} />
            )}
          </div>
        )}
      </div>
    );
  }
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
