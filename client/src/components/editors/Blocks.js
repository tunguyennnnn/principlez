import './render.scss';
import React from 'react';

import Placeholder from './Placeholder';

import {
  TITLE,
  PARAGRAPH,
  QUOTE,
  UNORDERED_LIST,
  ORDERED_LIST,
  LIST_ITEM,
} from './types';
import Paragraph from './Paragraph';
import Quote from './Quote';
import StoryWriteContext from '../../contexts/StoryWriteContext';

export default {
  [TITLE]: ({ attributes, children, node, readOnly }) => (
    <StoryWriteContext.Consumer>
      {({ placeholderText }) => (
        <h2 {...attributes}>
          {!readOnly && (
            <Placeholder node={node} placeholderText={placeholderText} />
          )}
          {children}
        </h2>
      )}
    </StoryWriteContext.Consumer>
  ),
  [PARAGRAPH]: props => <Paragraph {...props} />,
  [QUOTE]: props => <Quote {...props} />,
  [ORDERED_LIST]: props => (
    <ol {...props.attributes} class="editor-ol">
      {props.children}
    </ol>
  ),
  [UNORDERED_LIST]: props => (
    <ul {...props.attributes} class="editor-ul">
      {props.children}
    </ul>
  ),
  [LIST_ITEM]: props => (
    <li {...props.attributes} class="editor-li">
      {props.children}
    </li>
  ),
};
