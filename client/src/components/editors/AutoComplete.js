import React from 'react';

export default function AutoComplete(props) {
  const { attributes, children, isFocused, editor, node } = props;
  console.log(props);
  if (!isFocused) {
    editor.unwrapInlineByKey(node.key);
  }
  return (
    <span
      style={{ color: 'red' }}
      className="editor-autocomplete-mark"
      {...attributes}
    >
      {children}
    </span>
  );
}
