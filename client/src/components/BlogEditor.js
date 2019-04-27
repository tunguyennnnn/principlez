import './editors/blogeditor.scss';
import React from 'react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Editor } from 'slate-react';
import { Value, Block } from 'slate';
import Blocks from './editors/Blocks';
import BlockMenu from './editors/BlockMenu';

import schema from './editors/schema';
import previewBodySchema from './editors/previewBodySchema';
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
    const { previewOnly, noTitle } = this.props;
    if (previewOnly) {
      return Value.fromJSON({
        document: {
          nodes: body[0] ? [body[0]] : [],
        },
      });
    }

    if (noTitle) {
      return Value.fromJSON({
        document: {
          nodes: [...body],
        },
      });
    }

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
    const { readOnly } = this.props;
    if (value.document !== this.state.value.document && !readOnly) {
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

  getFocusKey = () => {
    const { value } = this.state;
    // const { selection } = value;

    if (value.blocks.size !== 1) return null;

    return value.focusBlock.key;
  };

  insertBlock = (type, focusKey) => {
    if (!focusKey) return;
    const { editor } = this;
    const { value } = editor;
    const { document } = value;
    const parent = document.getParent(focusKey);
    const index = parent.nodes.findIndex(n => n.key === focusKey);
    return editor.insertNodeByKey(parent.key, index + 1, Block.create(type));
  };

  render() {
    const { readOnly, previewOnly, noTitle } = this.props;
    const { value } = this.state;
    return (
      <div className="blog-editor-container">
        {!readOnly && (
          <BlockMenu
            focusKey={this.getFocusKey()}
            insertBlock={this.insertBlock}
          />
        )}
        <Editor
          value={value}
          renderEditor={this.renderEditor}
          readOnly={readOnly}
          spellCheck
          schema={previewOnly || noTitle ? previewBodySchema : schema}
          renderNode={this.renderNode}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
