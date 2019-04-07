import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Masonry from 'react-masonry-component';

import Card from '../../components/commons/Card';

const masonryOptions = {
  transitionDuration: 300,
};

class Body extends React.Component {
  render() {
    const { data } = this.props;

    if (data.loading || data.error) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <Masonry
          options={masonryOptions} // default {}
        >
          {data.allChapters.edges.map(({ cursor, node }, index) => {
            const { id } = node;
            return (
              <div
                key={`chapter-list-${id}`}
                style={{ width: '45%', margin: '2%', minWidth: 300 }}
              >
                <Card {...node} />
              </div>
            );
          })}
        </Masonry>
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
