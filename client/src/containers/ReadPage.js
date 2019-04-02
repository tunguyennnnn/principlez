import './readpage/readpage.scss';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { branch, renderComponent } from 'recompose';

import { extractUserId } from '../utils/userId';
import Story from './readpage/Story';
import AuthorInfo from './readpage/AuthorInfo';

class ReadPage extends React.Component {
  updateStore(proxy, { chapter }) {}

  render() {
    const { authorQuery, storiesQuery } = this.props;

    if (authorQuery.loading || storiesQuery.loading) {
      return <div>loading...</div>;
    }

    const { author } = authorQuery;
    const { stories } = storiesQuery.allChapters;
    return (
      <div class="read-page">
        <div class="author-info-container">
          <div class="author-info">
            <AuthorInfo {...author} />
          </div>
        </div>
        <div class="stories-container">
          <div class="stories">
            {stories.map(({ story }) => (
              <Story
                key={`author-${author.id}-stories-${story.id}`}
                {...story}
                author={author}
              />
            ))}
          </div>
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
        }
      }
    }
  }
`;

const userQuery = gql`
  query user($userId: ID!) {
    author: user(id: $userId) {
      id
      fullname
      email
      yearOfBirth
      profileImage {
        thumb
        medium
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
    name: 'storiesQuery',
    options: props => ({
      variables: {
        userId: extractUserId(props.match.params.name),
      },
    }),
  }),
  graphql(userQuery, {
    name: 'authorQuery',
    options: props => ({
      variables: {
        userId: extractUserId(props.match.params.name),
      },
    }),
  }),
  // renderWhileLoading(() => <div>Loading...</div>),
  graphql(likeChapter, { name: 'likeChapter' }),
  graphql(unlikeChapter, { name: 'unlikeChapter' }),
  graphql(viewChapter, { name: 'viewChapter' }),
)(ReadPage);
