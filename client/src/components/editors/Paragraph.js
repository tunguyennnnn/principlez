import React from 'react';

import Placeholder from './Placeholder';

export default class Paragraph extends React.Component {
  render() {
    const { attributes, children, node } = this.props;
    return (
      <p className="editor-p" {...attributes}>
        <Placeholder node={node} placeholderText="paragraph..." />
        {children}
      </p>
    );
  }
}
