import React from 'react';

export default class SearchForm extends React.Component {
  render() {
    return (
      <li>
        <form className="navbar-form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter keyword"
            />
            <button type="submit" className="btn btn-search">
              <i className="fa fa-search" />
            </button>
          </div>
        </form>
      </li>
    );
  }
}
