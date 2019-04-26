import React from 'react';

import Placeholder from './Placeholder';

export default class Quote extends React.Component {
  render() {
    const { attributes, children, node } = this.props;
    return (
      <p className="editor-quote" {...attributes}>
        <Placeholder node={node} placeholderText="A quote..." />
        {children}
      </p>
    );
  }
}
