import './author.scss';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { generateId } from '../../utils/userId';

function Author({ id, fullname, location, profileImage, blurb, occupation }) {
  return (
    <div className="author" to={`/of/${generateId(id, fullname)}`}>
      <Link to={`/of/${generateId(id, fullname)}`}>
        <div className="profile-image">
          {profileImage && <Image src={profileImage.medium} />}
        </div>
        <div className="info">
          <div className="name">{fullname}</div>
          <div className="location">{`${location.country} ${
            location.city
          }`}</div>
          <div className="occupation">{occupation}</div>
        </div>
      </Link>
    </div>
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
      return (
        <div className="home-authors-mobile">
          <div className="container">
            <div className="authors">
              {_.range(0, 5).map(i => (
                <Author
                  key={`home-author-${authors[0].id}`}
                  {...authors[0]}
                  horizontal={horizontal}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="home-authors">
        <div className="head">Top Authors & Coaches</div>
        <div
          className="container"
          style={{ maxHeight: window.innerHeight * 0.7 }}
        >
          <div className="authors">
            {_.range(0, 5).map(i => (
              <Author
                key={`home-author-${authors[0].id}`}
                {...authors[0]}
                horizontal={horizontal}
              />
            ))}
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
