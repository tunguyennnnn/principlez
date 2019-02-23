import React from 'react';

import { TITLE, PARAGRAPH } from './types';
import Paragraph from './Paragraph';

export default {
  [TITLE]: ({ attributes, children }) => <h2 {...attributes}>{children}</h2>,
  [PARAGRAPH]: props => <Paragraph {...props} />,
};
