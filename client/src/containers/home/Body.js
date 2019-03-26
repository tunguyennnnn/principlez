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
      <div>
        {data.allChapters.edges.map(({ cursor, node }) => {
          const { id } = node;
          return <Card key={`chapter-list-${id}`} {...node} />;
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
