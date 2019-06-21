import './readpage/readpage.scss';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { branch, renderComponent } from 'recompose';
import _ from 'lodash';
import queryString from 'query-string';
import { Element, scroller } from 'react-scroll';

import { extractUserId } from '../utils/userId';
import Story from './readpage/Story';
import AuthorInfo from './readpage/AuthorInfo';
import ChapterList from '../components/ChapterList';
import StoryEditorContext from '../contexts/StoryWriteContext';
import Sidebar from './SideBar';

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
    const { location } = this.props;
    const { search } = location;

    if (!search || storiesQuery.loading) return;

    const { id } = queryString.parse(search);

    if (!id) return;

    const isMobile = !!document.getElementById('stories-container');
    setTimeout(() => {
      scroller.scrollTo(`story-${id}`, {
        offset: -90,
        containerId: isMobile ? 'stories-container' : null,
      });
    }, 0);
  };

  componentDidUpdate() {
    this.scrollToStory();
  }

  renderChaptersMenu(mobile) {
    const { storiesQuery } = this.props;
    const stories = storiesQuery.allChapters.stories.map(({ story }) => story);
    return <ChapterList chapters={stories} readOnly mobile={mobile} />;
  }

  renderBody() {
    const { authorQuery, storiesQuery } = this.props;
    const { author } = authorQuery;
    const { stories } = storiesQuery.allChapters;
    return (
      <div className="stories-container">
        <div className="stories">
          {stories.map(({ story }) => (
            <Element
              name={`story-${story.id}`}
              key={`author-${author.id}-stories-${story.id}-container`}
            >
              <Story
                key={`author-${author.id}-stories-${story.id}`}
                likeChapter={this.likeChapter}
                unlikeChapter={this.unlikeChapter}
                {...story}
                author={author}
              />
            </Element>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { authorQuery, storiesQuery } = this.props;
    if (authorQuery.loading || storiesQuery.loading) {
      return <div>loading...</div>;
    }

    const { author } = authorQuery;

    return (
      <StoryEditorContext.Provider
        value={{
          titlePlaceholder: 'No title',
          readOnly: true,
        }}
      >
        <div className="read--page" ref={el => (this.containerEl = el)}>
          <Sidebar>
            <div className="author-info-container">
              <div className="author-info">
                <AuthorInfo {...author} />
                {this.renderChaptersMenu()}
              </div>
            </div>
          </Sidebar>
          <div className="col-lg-9 col-md-12">{this.renderBody()}</div>
        </div>
      </StoryEditorContext.Provider>
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
      location {
        country
        city
      }
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
