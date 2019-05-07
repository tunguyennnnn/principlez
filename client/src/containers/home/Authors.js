import './author.scss';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { generateId } from '../../utils/userId';

function Author({ id, fullname, location, profileImage, blurb, occupation }) {
  return (
    <Link className="author box-shadow" to={`/of/${generateId(id, fullname)}`}>
      <div className="profile-image">
        {profileImage && <Image src={profileImage.medium} />}
      </div>
      <div className="info">
        <div className="name">{fullname}</div>
        <div className="location">{`${location.country} ${location.city}`}</div>
        <div className="occupation">{occupation}</div>
      </div>
    </Link>
  );
}

class Authors extends React.Component {
  render() {
    const { data } = this.props;
    if (data.loading || data.error) {
      return <div />;
    }
    const { authors } = data;

    return (
      <div className="home-authors">
        {/* <div className="head">Authors</div> */}
        <div className="authors">
          {authors.map(author => (
            <Author key={`home-author-${author.id}`} {...author} />
          ))}
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
