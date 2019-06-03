import '../../components/search/search.scss';

import React from 'react';
import { Icon } from 'semantic-ui-react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { withRouter } from 'react-router-dom';

import SearchDropdown from '../../components/search/SearchDropdown';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      searchResults: [],
      isDropdownVisible: false,
    };

    this.input = new Subject().pipe(debounceTime(1000));
    this.input.subscribe(this._executeSearch);
  }

  componentDidMount() {
    document.addEventListener('click', this.hideDropdown);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideDropdown);
  }

  hideDropdown = () => {
    const { isDropdownVisible } = this.state;
    if (isDropdownVisible) {
      this.setState({ isDropdownVisible: false });
    }
  };

  showDropdown = () => {
    const { isDropdownVisible } = this.state;
    if (!isDropdownVisible) {
      this.setState({ isDropdownVisible: true });
    }
  };

  _executeSearch = async () => {
    try {
      const { text } = this.state;
      if (!text) return;
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
    if (!value) {
      this.setState({ ...this.state, searchResults: [] });
      this.hideDropdown();
    }
    this.input.next();
    this.showDropdown();
    this.setState({ text: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { text, searchResults } = this.state;
    if (!text) return;
    const searchPath = `?q=${text}`;
    this.props.history.push({
      pathname: '/search',
      search: searchPath,
      state: { results: searchResults },
    });
  };

  render() {
    const { searchResults, text, isDropdownVisible } = this.state;
    return (
      <div className="search-form-container">
        <Icon name="search" size="large" color="grey" />
        <div className="search-field-container">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Search Principlez"
              onChange={this.onChange}
            />
          </form>
          {isDropdownVisible && (
            <SearchDropdown results={searchResults} searchText={text} />
          )}
        </div>
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
        author {
          id
          fullname
        }
      }
      ... on UserSearchResult {
        id
        fullname
      }
    }
  }
`;

export default withRouter(withApollo(Search));
