import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import Card from '../../components/commons/Card';

class Body extends React.Component {
  render() {
    const { data } = this.props;

    if (data.loading || data.error) {
      return <div>loading...</div>;
    }
    return (
      <Grid stackable columns={2}>
        {data.allChapters.edges.map(({ cursor, node }) => {
          const { id } = node;
          return (
            <Grid.Column largeScreen={8} mobile={15}>
              <Card key={`chapter-list-${id}`} {...node} />
            </Grid.Column>
          );
        })}
      </Grid>
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
