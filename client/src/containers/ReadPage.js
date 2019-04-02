import './readpage/readpage.scss';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { branch, renderComponent } from 'recompose';

import { extractUserId } from '../utils/userId';
import Story from './readpage/Story';

class ReadPage extends React.Component {
  render() {
    const { data } = this.props;
    const { stories } = data.allChapters;
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
          updatedAt
          view {
            count
            anonymousCount
          }
          like {
            count
          }
          author {
            id
            fullname
            email
          }
        }
      }
    }
  }
`;

const likeChapter = gql`
  mutation likeChapter($chapterId: ID!) {
    likeResult: likeChapter(chapterId: $chapterId)
  }
`;

const unlikeChapter = gql`
  mutation unlikeChapter($chapterId: ID!) {
    likeResult: unlikeChapter(chapterId: $chapterId)
  }
`;

const viewChapter = gql`
  mutation viewChapter($chapterId: ID!) {
    viewChapter(chapterId: $chapterId)
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
  graphql(likeChapter, { name: 'likeChapter' }),
  graphql(unlikeChapter, { name: 'unlikeChapter' }),
  graphql(viewChapter, { name: 'viewChapter' }),
)(ReadPage);
