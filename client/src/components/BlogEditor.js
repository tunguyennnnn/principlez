import React, { Component } from 'react';

import { Editor } from 'slate-react';
import Plain from 'slate-plain-serializer';
import Blocks from './editors/Blocks';
import schema from './editors/schema';

export default class BlogEditor extends React.Component {
  state = {
    value: Plain.deserialize(''),
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  renderEditor = (props, editor, next) => {
    this.editor = editor;
    return next();
  };

  renderNode = (props, editor, next) => {
    const { node } = props;
    if (!Blocks[node.type]) return next();
    return Blocks[node.type].call(null, props);
  };

  render() {
    return (
      <div class="blog-editor-container">
        <Editor
          value={this.state.value}
          renderEditor={this.renderEditor}
          schema={schema}
          renderNode={this.renderNode}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
