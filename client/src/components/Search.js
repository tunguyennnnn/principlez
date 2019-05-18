import './search/search.scss';

import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import SearchDropdown from './search/SearchDropdown';

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
      console.log('search', search);
      this.setState({ ...this.state, searchResults: search });
    } catch (error) {
      console.log(error);
    }
  };

  onChange = event => {
    const { value } = event.target;
    if (!value) {
      this.setState({ ...this.state, searchResults: [] });
    }
    this.input.next();
    this.setState({ text: value });
  };

  render() {
    const { isSearching, searchResults, text } = this.state;
    return (
      <div className="search-form-container">
        <Icon
          name="search"
          size="large"
          color="grey"
          onClick={this.clickToShowSearchInput}
        />
        {isSearching && (
          <div className="search-field-container">
            <form>
              <input
                type="text"
                placeholder="Search Principlez"
                onChange={this.onChange}
                autoFocus
              />
            </form>
            {text.length > 0 && (
              <SearchDropdown results={searchResults} searchText={text} />
            )}
          </div>
        )}
      </div>
    );
  }
}

// function Search(props) {
//   const [isSearching, setSearchInput] = useState(false);
//   const [text, setText] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const input = new Subject();

//   const clickToShowSearchInput = () => {
//     if (!isSearching) {
//       setSearchInput(true);
//     }
//   };

//   const _executeSearch = async () => {
//     try {
//       const result = await props.client.query({
//         query: searchQuery,
//         variables: { text },
//         fetchPolicy: 'no-cache',
//       });
//       const {
//         data: { search },
//       } = result;
//       console.log(search);
//       setSearchResults(search);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const onChange = event => {
//     const { value } = event.target;
//     if (value !== text) {
//       input.next();
//     }
//     setText(value);
//   };

//   useEffect(() => {
//     input.pipe(debounceTime(3000)).subscribe(_executeSearch);
//     return () => {
//       input.unsubscribe();
//     };
//   });

//   return (
//     <div className="search-field-container">
//       <Icon
//         name="search"
//         size="large"
//         color="grey"
//         onClick={clickToShowSearchInput}
//       />
//       {isSearching && (
//         <div className="search-form-container">
//           <form>
//             <input
//               type="text"
//               placeholder="Search Principlez"
//               // onChange={e => setText(e.target.value)}
//               onChange={onChange}
//             />
//           </form>
//           {/* {!_.isEmpty(searchResults) && (
//             <SearchResultsDropdown results={searchResults} />
//           )} */}
//         </div>
//       )}
//     </div>
//   );
// }

const searchQuery = gql`
  query searchQuery($text: String!) {
    search(text: $text) {
      ... on StorySearchResult {
        id
        title
        body
        userId
      }
      ... on UserSearchResult {
        id
        fullname
      }
    }
  }
`;

export default withApollo(Search);
