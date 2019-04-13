import './storypage/storypage.scss';
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import _ from 'lodash';
import StoryWriteContext from '../contexts/StoryWriteContext';

import ChapterGroup from './storypage/ChapterGroup';
import StoryWrite from './storypage/StoryWrite';
import StoryView from './storypage/StoryView';
import Action from './storypage/Action';
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
      <StoryWriteContext.Provider
        value={{
          placeholderText: 'Tell us your story...',
        }}
      >
        <div className="story-page">
          <MediaQuery query="(min-width: 850px)">
            <div className="chapter-list-container side-menu-grid">
              <ChapterGroup
                readOnly={readOnly}
                updateTitleRef={fn => (this.updateTitle = fn)}
              />
            </div>
          </MediaQuery>
          <MediaQuery query="(max-width: 850px">
            <div className="chapter-list-container">
              <SideMenu>
                <ChapterGroup
                  readOnly={readOnly}
                  updateTitleRef={fn => (this.updateTitle = fn)}
                />
              </SideMenu>
            </div>
          </MediaQuery>
          <TransitionGroup className="writing-container">
            <CSSTransition
              key={this.props.location.key}
              classNames="move"
              timeout={1000}
              appear
            >
              <StoryComponent
                location={this.props.location}
                match={this.props.match}
                title="Chapter..."
                updateChapterTitle={this.updateChapterTitle}
              />
            </CSSTransition>
          </TransitionGroup>
          <Action readOnly={readOnly} match={this.props.match} />
        </div>
      </StoryWriteContext.Provider>
    );
  }
}
