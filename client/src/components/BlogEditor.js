import React, { Component } from 'react';
import { Subject, timer } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';
import Blocks from './editors/Blocks';
import schema from './editors/schema';
import { TITLE } from './editors/types';

export default class BlogEditor extends React.Component {
  constructor(props) {
    super(props);
    const { title, body } = props;
    this.state = {
      value: this.initializeValue(title, body),
    };
    this.observable = new Subject().pipe(debounceTime(1000));
    this.observable.subscribe(this.update);
  }

  initializeValue = (title, body) => {
    window.test = {
      Value,
      title,
      body,
    };
    return Value.fromJSON({
      document: {
        nodes: [
          {
            object: 'block',
            type: TITLE,
            nodes: [
              { object: 'text', leaves: [{ object: 'leaf', text: title }] },
            ],
          },
          ...body,
        ],
      },
    });
  };

  update = () => {
    const { nodes } = this.state.value.document;
    const title = nodes.first().text;
    const body = _.slice(this.state.value.document.toJSON().nodes, 1);
    this.props.update(title, body);
  };

  onChange = ({ value }) => {
    if (value.document !== this.state.value.document) {
      this.observable.next();
    }
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
          placeholder="Your story..."
          value={this.state.value}
          renderEditor={this.renderEditor}
          autoFocus
          spellCheck
          schema={schema}
          renderNode={this.renderNode}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
