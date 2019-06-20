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
      <div className="row">
        {data.allChapters.edges.map(({ cursor, node }) => {
          return (
            <div className="col-xs-12" key={`chapter-list-${node.id}`}>
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
