import './readpage/readpage.scss';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { branch, renderComponent } from 'recompose';
import MediaQuery from 'react-responsive';
import _ from 'lodash';
import queryString from 'query-string';

import { extractUserId } from '../utils/userId';
import Story from './readpage/Story';
import AuthorInfo from './readpage/AuthorInfo';

class ReadPage extends React.Component {
  storiesRef = {};

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

  scrollToStory = () => {
    const { location, data } = this.props;
    const { search } = location;
    if (search && !storiesQuery.loading) {
      const { id } = queryString.parse(search);
      if (id && this.storiesRef[id]) {
        const ref = this.storiesRef[id];
        const top = ref.offsetTop - this.containerEl.offsetTop;
        setTimeout(() => window.scroll({ top }), 0);
      }
    }
  };

  componentDidUpdate() {
    this.scrollToStory();
  }

  render() {
    const { authorQuery, storiesQuery } = this.props;

    if (authorQuery.loading || storiesQuery.loading) {
      return <div>loading...</div>;
    }

    const { author } = authorQuery;
    const { stories } = storiesQuery.allChapters;
    return (
      <div class="read-page" ref={el => (this.containerEl = el)}>
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
              <div
                key={`author-${author.id}-stories-${story.id}-container`}
                ref={el => (this.storiesRef[story.id] = el)}
              >
                <Story
                  key={`author-${author.id}-stories-${story.id}`}
                  likeChapter={this.likeChapter}
                  unlikeChapter={this.unlikeChapter}
                  {...story}
                  author={author}
                />
              </div>
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
