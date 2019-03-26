import { Block } from 'slate';

import { PARAGRAPH } from './types';

export default {
  document: {
    nodes: [{ match: [PARAGRAPH].map(type => ({ type })), min: 1 }],
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
};
