import './render.scss';
import React from 'react';

import Placeholder from './Placeholder';

import { TITLE, PARAGRAPH, QUOTE } from './types';
import Paragraph from './Paragraph';
import Quote from './Quote';
import StoryWriteContext from '../../contexts/StoryWriteContext';

export default {
  [TITLE]: ({ attributes, children, node }) => (
    <StoryWriteContext.Consumer>
      {({ placeholderText }) => (
        <h2 {...attributes}>
          <Placeholder node={node} placeholderText={placeholderText} />
          {children}
        </h2>
      )}
    </StoryWriteContext.Consumer>
  ),
  [PARAGRAPH]: props => <Paragraph {...props} />,
  [QUOTE]: props => <Quote {...props} />,
};
