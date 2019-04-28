import React from 'react';
import IconButton from '../commons/IconButton';
import { PARAGRAPH, QUOTE, UNORDERED_LIST, ORDERED_LIST } from './types';

function computeTop(top, nodeHeight, menuHeight) {
  if (nodeHeight >= menuHeight) {
    return top + nodeHeight - menuHeight; // display at bottom
  }
  return top - menuHeight / 2 + nodeHeight / 2; // display in middle
}

export default function BlockMenu({ focusKey, insertBlock }) {
  const domNode =
    focusKey && document.querySelector(`[data-key="${focusKey}"]`);

  const menuNode = document.querySelector('.editor-block-menu');
  const blogEditor = document.querySelector('.blog-editor');

  const { left = 0 } = blogEditor ? blogEditor.getBoundingClientRect() : {};
  const boundingRect = domNode ? domNode.getBoundingClientRect() : {};
  const menuWidth = menuNode ? menuNode.offsetWidth : 20;
  const menuHeight = menuNode ? menuNode.offsetHeight : 40;

  const { top = 0, height = 24 } = boundingRect;

  return (
    <div
      className="editor-block-menu"
      style={{
        visibility: domNode ? 'visible' : 'hidden',
        opacity: domNode ? 1 : 0,
        left: left - menuWidth - 5,
        top: computeTop(top, height, menuHeight),
      }}
    >
      <IconButton
        iconName="paragraph"
        style={{ fontSize: 10 }}
        action={insertBlock.bind(null, PARAGRAPH, focusKey)}
      />
      <IconButton
        iconName="pen square"
        style={{ fontSize: 10 }}
        action={insertBlock.bind(null, QUOTE, focusKey)}
      />
      <IconButton
        iconName="list ol"
        style={{ fontSize: 10 }}
        action={insertBlock.bind(null, ORDERED_LIST, focusKey)}
      />
      <IconButton
        iconName="list ul"
        style={{ fontSize: 10 }}
        action={insertBlock.bind(null, UNORDERED_LIST, focusKey)}
      />
    </div>
  );
}
