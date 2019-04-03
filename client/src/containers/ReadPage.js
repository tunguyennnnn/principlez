import './readpage/readpage.scss';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { branch, renderComponent } from 'recompose';
import MediaQuery from 'react-responsive';
import _ from 'lodash';

import { extractUserId } from '../utils/userId';
import Story from './readpage/Story';
import AuthorInfo from './readpage/AuthorInfo';

class ReadPage extends React.Component {
  updateStore = (chapterId, proxy, { data: { likeResult } }) => {
    const userId = extractUserId(this.props.match.params.name);
    const data = proxy.readQuery({
      query: storiesQuery,
      variables: { userId },
    });
    const chapter = _.find(data.allChapters.stories, ({ story }) => {
      return story.id === chapterId;
    });
    chapter.story.like = likeResult;
    proxy.writeQuery({ query: storiesQuery, data, variables: { userId } });
  };

  likeChapter = async chapterId => {
    try {
      this.props.likeChapter({
        variables: { chapterId },
        update: this.updateStore.bind(this, chapterId),
      });
    } catch (e) {
      console.log(e);
    }
  };

  unlikeChapter = async chapterId => {
    try {
      this.props.unlikeChapter({
        variables: { chapterId },
        update: this.updateStore.bind(this, chapterId),
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { authorQuery, storiesQuery } = this.props;

    if (authorQuery.loading || storiesQuery.loading) {
      return <div>loading...</div>;
    }

    const { author } = authorQuery;
    const { stories } = storiesQuery.allChapters;
    return (
      <div class="read-page">
        <MediaQuery query="(min-width: 850px)">
          <div class="author-info-container">
            <div class="author-info">
              <AuthorInfo {...author} />
            </div>
          </div>
        </MediaQuery>
        <MediaQuery query="(max-width: 850px)">
          <div class="author-info-container-mobile">
            <div class="author-info">
              <AuthorInfo {...author} />
            </div>
          </div>
        </MediaQuery>
        <div class="stories-container">
          <div class="stories">
            {stories.map(({ story }) => (
              <Story
                key={`author-${author.id}-stories-${story.id}`}
                likeChapter={this.likeChapter}
                unlikeChapter={this.unlikeChapter}
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
            liked
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
    likeResult: likeChapter(chapterId: $chapterId) {
      count
      liked
    }
  }
`;

const unlikeChapter = gql`
  mutation unlikeChapter($chapterId: ID!) {
    likeResult: unlikeChapter(chapterId: $chapterId) {
      count
      liked
    }
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
