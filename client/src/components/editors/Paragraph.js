import React from 'react';

import Placeholder from './Placeholder';

export default class Paragraph extends React.Component {
  render() {
    const { attributes, children, node } = this.props;
    return (
      <p class="editor-p" {...attributes}>
        <Placeholder node={node} placeholderText="paragraph..." />
        {children}
      </p>
    );
  }
}
