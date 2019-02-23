import React from 'react';
import _ from 'lodash';

export default function({ node, placeholderText = '...' }) {
  if (_.trim(node.text)) return null;
  return (
    <span
      class="editor-placeholder-text"
      contentEditable={false}
      style={{
        display: 'inline-block',
        width: '0',
        whiteSpace: 'nowrap',
        opacity: '0.33',
        zIndex: -1,
      }}
    >
      {placeholderText}
    </span>
  );
}
