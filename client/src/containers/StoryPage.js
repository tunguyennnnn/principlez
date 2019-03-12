import './storypage/storypage.scss';
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import _ from 'lodash';

import ChapterGroup from './storypage/ChapterGroup';
import StoryWrite from './storypage/StoryWrite';
import SideMenu from '../components/SideMenu';

export default class StoryPage extends Component {
  updateChapterTitle = (id, title, type) => {
    if (this.updateTitle) {
      this.updateTitle(id, title, type);
    }
  };

  render() {
    return (
      <div class="story-page">
        <MediaQuery query="(min-width: 850px)">
          <div class="chapter-list-container">
            <ChapterGroup updateTitleRef={fn => (this.updateTitle = fn)} />
          </div>
        </MediaQuery>
        <MediaQuery query="(max-width: 850px">
          <div class="chapter-list-container">
            <SideMenu>
              <ChapterGroup updateTitleRef={fn => (this.updateTitle = fn)} />
            </SideMenu>
          </div>
        </MediaQuery>
        <TransitionGroup className="blog-editor-container">
          <CSSTransition
            key={this.props.location.key}
            classNames="move"
            timeout={1000}
            appear
          >
            <StoryWrite
              match={this.props.match}
              title="Chapter..."
              updateChapterTitle={this.updateChapterTitle}
            />
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}
