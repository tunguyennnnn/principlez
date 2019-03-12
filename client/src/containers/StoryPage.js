import './storypage/storypage.scss';
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import _ from 'lodash';

import ChapterGroup from './storypage/ChapterGroup';
import StoryWrite from './storypage/StoryWrite';
import StoryView from './storypage/StoryView';
import SideMenu from '../components/SideMenu';

export default class StoryPage extends Component {
  updateChapterTitle = (id, title, type) => {
    if (this.updateTitle) {
      this.updateTitle(id, title, type);
    }
  };

  render() {
    const { readOnly } = this.props;
    const StoryComponent = readOnly ? StoryView : StoryWrite;
    return (
      <div class="story-page">
        <MediaQuery query="(min-width: 850px)">
          <div class="chapter-list-container">
            <ChapterGroup
              readOnly={readOnly}
              updateTitleRef={fn => (this.updateTitle = fn)}
            />
          </div>
        </MediaQuery>
        <MediaQuery query="(max-width: 850px">
          <div class="chapter-list-container">
            <SideMenu>
              <ChapterGroup
                readOnly={readOnly}
                updateTitleRef={fn => (this.updateTitle = fn)}
              />
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
            <StoryComponent
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
