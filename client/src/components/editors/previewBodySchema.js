import { Block } from 'slate';

import {
  TITLE,
  PARAGRAPH,
  QUOTE,
  ORDERED_LIST,
  UNORDERED_LIST,
  LIST_ITEM,
} from './types';

export default {
  document: {
    nodes: [
      {
        match: [PARAGRAPH, QUOTE, ORDERED_LIST, UNORDERED_LIST].map(type => ({
          type,
        })),
        min: 1,
      },
    ],
    last: { type: PARAGRAPH },
    normalize: (editor, { code, node, child, index }) => {
      switch (code) {
        case 'child_type_invalid': {
          const type = PARAGRAPH;
          return editor.setNodeByKey(child.key, type);
        }
        case 'child_min_invalid': {
          const block = Block.create(PARAGRAPH);
          return editor.insertNodeByKey(node.key, index, block);
        }
        case 'last_child_type_invalid': {
          const paragraph = Block.create(PARAGRAPH);
          return editor.insertNodeByKey(node.key, node.nodes.size, paragraph);
        }
      }
    },
  },
  blocks: {
    [ORDERED_LIST]: {
      nodes: [{ match: { type: LIST_ITEM }, min: 1 }],
      normalize: (change, { code: reason, node, child, index }) => {
        switch (reason) {
          case 'child_min_invalid': {
            return change.insertNodeByKey(node.key, 0, Block.create(LIST_ITEM));
          }
          case 'child_type_invalid': {
            const block = Block.create(LIST_ITEM);
            return change.insertNodeByKey(node.key, index, block);
          }
        }
      },
    },
    [UNORDERED_LIST]: {
      nodes: [{ match: { type: LIST_ITEM }, min: 1 }],
      normalize: (change, { code: reason, node, child, index }) => {
        switch (reason) {
          case 'child_min_invalid': {
            return change.insertNodeByKey(node.key, 0, Block.create(LIST_ITEM));
          }
          case 'child_type_invalid': {
            const block = Block.create(LIST_ITEM);
            return change.insertNodeByKey(node.key, index, block);
          }
        }
      },
    },
    [LIST_ITEM]: {
      parent: [{ type: UNORDERED_LIST }, { type: ORDERED_LIST }],
      nodes: [
        {
          match: [PARAGRAPH].map(type => ({ type })),
          min: 1,
          max: 1,
        },
      ],
      normalize: (change, { code: reason, node, child, index }) => {
        switch (reason) {
          case 'child_min_invalid': {
            return change.insertNodeByKey(node.key, 0, Block.create(PARAGRAPH));
          }
          case 'child_type_invalid': {
            const block = Block.create(PARAGRAPH);
            return change.insertNodeByKey(node.key, index, block);
          }
          case 'child_max_invalid': {
            const { value } = change;
            const { document } = value;
            const list = document.getParent(node.key);
            const itemIndex = list.nodes.findIndex(n => n.key === node.key);
            return change
              .removeNodeByKey(child.key)
              .insertNodeByKey(
                list.key,
                itemIndex + 1,
                Block.create(LIST_ITEM),
              );
          }
        }
      },
    },
  },
};
