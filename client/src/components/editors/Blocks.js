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
import StoryEditorContext from '../../contexts/StoryWriteContext';

export default {
  [TITLE]: ({ attributes, children, node }) => (
    <StoryEditorContext.Consumer>
      {({ titlePlaceholder, readOnly }) => (
        <h2 {...attributes}>
          <Placeholder node={node} placeholderText={titlePlaceholder} />
          {children}
        </h2>
      )}
    </StoryEditorContext.Consumer>
  ),
  [PARAGRAPH]: props => (
    <StoryEditorContext.Consumer>
      {({ readOnly }) => <Paragraph {...props} readOnly={readOnly} />}
    </StoryEditorContext.Consumer>
  ),
  [QUOTE]: props => (
    <StoryEditorContext.Consumer>
      {({ readOnly }) => <Quote {...props} />}
    </StoryEditorContext.Consumer>
  ),
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
