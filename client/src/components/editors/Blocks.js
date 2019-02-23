import React from 'react';

import Placeholder from './Placeholder';

import { TITLE, PARAGRAPH } from './types';
import Paragraph from './Paragraph';

export default {
  [TITLE]: ({ attributes, children, node }) => (
    <h2 {...attributes}>
      <Placeholder node={node} placeholderText="Write your story..." />
      {children}
    </h2>
  ),
  [PARAGRAPH]: props => <Paragraph {...props} />,
};
