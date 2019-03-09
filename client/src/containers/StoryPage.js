import './storypage/storypage.scss';
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';

import StoryWrite from './storypage/StoryWrite';
import ChapterList from '../components/ChapterList';
import SideMenu from '../components/SideMenu';

const TypeToTitle = {
  ABOUT_ME: 'About Me',
  STORY: 'My Stories',
  LESSON: 'Principles',
};

const OrderedGroup = ['ABOUT_ME', 'STORY', 'LESSON'];

class StoryPage extends Component {
  get basePath() {
    const {
      match: { url },
    } = this.props;
    return url;
  }

  render() {
    const { data } = this.props;
    if (data.loading) {
      return <div>...loading</div>;
    }

    if (data.error) {
      return <div>something is wrong</div>;
    }

    const { myChapterGroups } = data;

    const ChapterListComponents = (
      <React.Fragment>
        {_.sortBy(myChapterGroups, group =>
          OrderedGroup.indexOf(group.type),
        ).map(group => {
          const { type, id, chapters } = group;
          return (
            <ChapterList
              key={`group-${type}-${id}`}
              basePath={this.basePath}
              title={TypeToTitle[type]}
              chapters={chapters}
            />
          );
        })}
      </React.Fragment>
    );
    return (
      <div class="story-page">
        <MediaQuery query="(min-width: 850px)">
          <div class="chapter-list-container">{ChapterListComponents}</div>
        </MediaQuery>
        <MediaQuery query="(max-width: 850px">
          <div class="chapter-list-container">
            <SideMenu>{ChapterListComponents}</SideMenu>
          </div>
        </MediaQuery>
        <TransitionGroup className="blog-editor-container">
          <CSSTransition
            key={this.props.location.key}
            classNames="move"
            timeout={1000}
            appear
          >
            <Switch>
              <Route
                exact
                path="/stories/:id/"
                component={props => <StoryWrite {...props} title="My Story" />}
              />
              <Route
                exact
                path="/stories/:id/chapters/:chapterId"
                component={props => (
                  <StoryWrite {...props} title="Chapter..." />
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

const chapterGroupsQuery = gql`
  query myChapterGroups {
    myChapterGroups {
      id
      type
      chapterListOrder
      chapters {
        id
        title
      }
    }
  }
`;
export default compose(graphql(chapterGroupsQuery))(StoryPage);
