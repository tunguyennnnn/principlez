import './storypage/storypage.scss';
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import _ from 'lodash';

import StoryEditorContext from '../contexts/StoryWriteContext';
import ChapterGroup from './storypage/ChapterGroup';
import StoryWrite from './storypage/StoryWrite';
import Action from './storypage/Action';
import SideMenu from '../components/SideMenu';

export default class StoryPage extends Component {
  updateChapterTitle = (id, title, type) => {
    if (this.updateTitle) {
      this.updateTitle(id, title, type);
    }
  };

  renderMobile() {
    return (
      <SideMenu
        headerTitle="Your Stories"
        menuComp={
          <ChapterGroup updateTitleRef={fn => (this.updateTitle = fn)} mobile />
        }
        contentComp={setOpenMenu => (
          <StoryWrite
            mobile
            setOpenMenu={setOpenMenu}
            location={this.props.location}
            match={this.props.match}
            title="Chapter..."
            updateChapterTitle={this.updateChapterTitle}
          />
        )}
      />
    );
  }

  renderDestop() {
    return (
      <div className="story-page">
        <div className="chapter-list-container side-menu-grid">
          <ChapterGroup updateTitleRef={fn => (this.updateTitle = fn)} />
        </div>
        <TransitionGroup
          className="writing-container"
          style={{ minHeight: window.innerHeight - 80 }}
        >
          <CSSTransition
            key={this.props.location.key}
            classNames="move"
            timeout={1000}
            appear
          >
            <StoryWrite
              location={this.props.location}
              match={this.props.match}
              title="Chapter..."
              updateChapterTitle={this.updateChapterTitle}
            />
          </CSSTransition>
        </TransitionGroup>
        <Action match={this.props.match} />
      </div>
    );
  }

  render() {
    return (
      <StoryEditorContext.Provider
        value={{
          titlePlaceholder: 'Tell us your story...',
          readOnly: false,
        }}
      >
        <MediaQuery query="(min-width: 850px)">
          {this.renderDestop()}
        </MediaQuery>
        <MediaQuery query="(max-width: 849px)">
          {this.renderMobile()}
        </MediaQuery>
      </StoryEditorContext.Provider>
    );
  }
}
