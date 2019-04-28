import React from 'react';

import Placeholder from './Placeholder';

export default class Quote extends React.Component {
  render() {
    const { attributes, children, node, readOnly } = this.props;
    return (
      <blockquote className="editor-quote" {...attributes}>
        {!readOnly && <Placeholder node={node} placeholderText="A quote..." />}
        {children}
      </blockquote>
    );
  }
}
