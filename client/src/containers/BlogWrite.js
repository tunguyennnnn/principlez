import React, { Component } from 'react';

import BlogEditor from '../components/BlogEditor';

export default class BlogWrite extends Component {
  render() {
    return (
      <div>
        <div>Blog Page</div>
        <div className="blog-editor-container">
          <BlogEditor />
        </div>
      </div>
    );
  }
}
