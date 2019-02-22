import './storypage.scss';
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { Switch, Route } from 'react-router-dom';

import BlogEditor from '../components/BlogEditor';
import ChapterList from '../components/ChapterList';
import SideMenu from '../components/SideMenu';

export default class BlogWrite extends Component {
  get basePath() {
    const {
      match: { url },
    } = this.props;
    return url;
  }

  render() {
    const ChapterListComponents = (
      <React.Fragment>
        <ChapterList
          basePath={this.basePath}
          title={'About me'}
          chapters={[{ id: null, title: 'My background' }]}
        />
        <ChapterList
          basePath={this.basePath}
          title={'My life'}
          chapters={[
            { id: 1, title: 'Chapter 1' },
            { id: 2, title: 'Chapter 2' },
            { id: 3, title: 'Chapter 3' },
          ]}
        />
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
        <div class="blog-editor-container">
          <Route
            exact
            path="/stories/:id/"
            component={() => <BlogEditor title="My Story" />}
          />
          <Route
            path="/stories/:id/chapters/:chapterId"
            component={() => <BlogEditor title="Chapter..." />}
          />
        </div>
      </div>
    );
  }
}
