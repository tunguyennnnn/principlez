import React, { Component } from 'react';
import _ from 'lodash';
import { Card, CardBody } from 'reactstrap';

import StoryEditorContext from '../contexts/StoryWriteContext';
import ChapterGroup from './storypage/ChapterGroup';
import StoryWrite from './storypage/StoryWrite';
import Sidebar from './SideBar';

export default class StoryPage extends Component {
  updateChapterTitle = (id, title, type) => {
    if (this.updateTitle) {
      this.updateTitle(id, title, type);
    }
  };

  render() {
    return (
      <StoryEditorContext.Provider
        value={{
          titlePlaceholder: 'Tell us your story...',
          readOnly: false,
        }}
      >
        <div className="story-page">
          <Sidebar>
            <ChapterGroup updateTitleRef={fn => (this.updateTitle = fn)} />
          </Sidebar>
          <Card style={{ minHeight: window.innerHeight }}>
            <CardBody>
              <StoryWrite
                location={this.props.location}
                match={this.props.match}
                title="Chapter..."
                updateChapterTitle={this.updateChapterTitle}
              />
            </CardBody>
          </Card>
        </div>
      </StoryEditorContext.Provider>
    );
  }
}
