import './body.scss';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Card from '../../components/commons/Card';

class Body extends React.Component {
  render() {
    const { data } = this.props;
    if (data.loading || data.error) {
      return <div>loading...</div>;
    }
    return (
      <div className="home-body-container">
        {data.allChapters.edges.map(({ cursor, node }, index) => {
          return (
            <div
              key={`chapter-list-${node.id}`}
              className="body-story-container"
            >
              <Card {...node} />
            </div>
          );
        })}
      </div>
    );
  }
}

const allChaptersQuery = gql`
  query allChapters($limit: Int, $cursor: String) {
    allChapters(limit: $limit, cursor: $cursor) {
      edges {
        cursor
        node {
          id
          title
          type
          body
          updatedAt
          isAuthor
          author {
            id
            fullname
          }
          view {
            count
            anonymousCount
          }
          like {
            count
          }
        }
      }
    }
  }
`;

export default compose(
  graphql(allChaptersQuery, {
    options: props => {
      return {
        variables: {},
      };
    },
  }),
)(Body);
