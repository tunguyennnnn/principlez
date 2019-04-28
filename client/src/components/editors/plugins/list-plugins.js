import { Block } from 'slate';
// import EditList from 'slate-edit-list';
import { ORDERED_LIST, UNORDERED_LIST, LIST_ITEM, PARAGRAPH } from '../types';

export default {
  onKeyDown(event, editor, next) {
    const { value } = editor;
    const { document } = value;
    const focusKey = value.focusBlock.key;
    const listItem = document.getParent(focusKey);
    if (listItem.type !== LIST_ITEM) {
      return next();
    }
    const { which } = event;
    if (which === 8 && !value.focusBlock.text) {
      const list = document.getParent(listItem.key);
      if (list.nodes.size > 1) {
        return editor.removeNodeByKey(listItem.key);
      }
      return editor.removeNodeByKey(list.key);
    }
    next();
  },
};

// export default EditList({
//   types: [ORDERED_LIST, UNORDERED_LIST],
//   typeItem: LIST_ITEM,
//   typeDefault: PARAGRAPH,
// });
