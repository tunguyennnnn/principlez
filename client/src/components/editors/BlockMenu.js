import React from 'react';
import IconButton from '../commons/IconButton';

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
      <IconButton
        iconName="paragraph"
        style={{ fontSize: 10 }}
        action={insertBlock.bind(null, 'paragrapqh', focusKey)}
      />
      <IconButton
        iconName="pen square"
        style={{ fontSize: 10 }}
        action={insertBlock.bind(null, 'quote', focusKey)}
      />
    </div>
  );
}
