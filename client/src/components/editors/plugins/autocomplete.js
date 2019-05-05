import TrieSearch from 'trie-search';
import _ from 'lodash';
import { Mark, Range, Inline } from 'slate';
import { AUTO_COMPLETE_MARK, PARAGRAPH } from '../types';
import { last } from 'rxjs/operators';

const ts = new TrieSearch('name', { min: 2 });

const keywords = [{ name: 'entrepreneur' }];

ts.addAll(keywords);

function lastWords(text, offset, numberOfWords = 1) {
  const beforeOffsetText = text.substring(0, offset);
  const afterOffsetText = text.substring(offset);
  const lastWords = beforeOffsetText.split(/\s+/);
  return _.slice(lastWords, lastWords.length - numberOfWords).join(' ');
}

export default {
  onChange(editor, next) {
    const { value } = editor;
    const { selection, focusText, focusBlock, marks } = value;
    if (
      selection.isExpanded ||
      selection.isBackward ||
      !focusBlock ||
      focusBlock.type !== PARAGRAPH ||
      !focusText ||
      marks.size
    ) {
      return next();
    }

    const { text } = focusText;
    const lastWord = lastWords(text, selection.focus.offset, 1);
    const matches = ts.get(lastWord);
    if (matches.length === 0) {
      return next();
    }

    editor
      .insertInline(
        Inline.create({
          type: AUTO_COMPLETE_MARK,
          nodes: [
            {
              object: 'text',
              leaves: [{ object: 'leaf', text: `_${lastWord}_` }],
            },
          ],
          data: { matches },
        }),
      )
      .moveFocusBackward(1)
      .moveAnchorBackward(1);
  },
};
