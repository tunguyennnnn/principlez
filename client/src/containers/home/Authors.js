import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import { generateId } from '../../utils/userId';

function Author({ id, fullname, location, profileImage, blurb, occupation }) {
  return (
    <li>
      <Link to={`/of/${generateId(id, fullname)}`}>
        <img src={profileImage.medium} alt="" />
      </Link>
      <h4 className="username text-ellipsis">
        {fullname}
        <small>{occupation}</small>
      </h4>
    </li>
  );
}

class Authors extends React.Component {
  render() {
    const { data, horizontal } = this.props;
    if (data.loading || data.error) {
      return <div />;
    }
    const { authors } = data;

    if (horizontal) {
      return null;
    }

    return (
      <div className="home-authors-container">
        <div className="panel panel-inverse">
          <ul className="registered-users-list clearfix">
            {authors.map(author => (
              <Author
                key={`home-author-${author.id}`}
                {...author}
                horizontal={horizontal}
              />
            ))}
          </ul>
          <div className="panel-footer ">
            <Link to="/users" className="text-inverse">
              View All
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const usersQuery = gql`
  query users {
    authors: users {
      id
      fullname
      location {
        country
        city
      }
      profileImage {
        medium
      }
      blurb
      occupation
    }
  }
`;

export default compose(
  graphql(usersQuery, {
    options: props => {
      return {
        variables: {},
      };
    },
  }),
)(Authors);
