import React from 'react';
import IconButton from '../commons/IconButton';

function computeTop(top, nodeHeight, menuHeight) {
  if (nodeHeight >= menuHeight) {
    return top + nodeHeight - menuHeight;
  }
  return top - menuHeight / 2 + nodeHeight / 2;
}

export default function BlockMenu({ focusKey }) {
  const domNode =
    focusKey && document.querySelector(`[data-key="${focusKey}"]`);

  const menuNode = document.querySelector('.editor-block-menu');

  const boundingRect = domNode ? domNode.getBoundingClientRect() : {};
  const menuWidth = menuNode ? menuNode.offsetWidth : 20;
  const menuHeight = menuNode ? menuNode.offsetHeight : 40;

  const { top = 0, left = 0, height = 24 } = boundingRect;

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
      <IconButton iconName="paragraph" style={{ fontSize: 10 }} />
      <IconButton iconName="pen square" style={{ fontSize: 10 }} />
    </div>
  );
}
