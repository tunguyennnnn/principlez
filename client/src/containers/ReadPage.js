import './readpage/readpage.scss';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { branch, renderComponent } from 'recompose';

import { extractUserId } from '../utils/userId';
import Story from './readpage/Story';

function ReadPage({ data }) {
  const { stories } = data.allChapters;
  console.log(data);
  console.log(stories);
  return (
    <div class="read-page">
      <div class="stories-container">
        {stories.map(({ story }) => (
          <Story {...story} />
        ))}
      </div>
    </div>
  );
}

function renderWhileLoading(component) {
  return branch(
    props => props.data && props.data.loading,
    renderComponent(component),
  );
}

const storiesQuery = gql`
  query allChapters($userId: ID) {
    allChapters(userId: $userId) {
      stories: edges {
        story: node {
          id
          title
          body
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
  graphql(storiesQuery, {
    options: props => ({
      variables: {
        userId: extractUserId(props.match.params.name),
      },
    }),
  }),
  renderWhileLoading(() => <div>Loading...</div>),
)(ReadPage);
