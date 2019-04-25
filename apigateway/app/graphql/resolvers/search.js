import _ from 'lodash';

function getSearchSpec(text) {
  if (text.startsWith('@')) {
    return {
      type: 'User',
      text: text.substring(1),
      __typename: 'UserSearchResult',
    };
  }
  if (text.startsWith('#')) {
    return {
      type: 'Tag',
      text: text.substring(1),
      __typename: 'TagSearchResult',
    };
  }
  return { type: 'Chapter', text, __typename: 'StorySearchResult' };
}

export default {
  Query: {
    search: async (root, { text }, { models }) => {
      const spec = getSearchSpec(text);
      const model = models[spec.type];

      if (spec.text.length === 0) {
        throw new Error('Not valid search');
      }

      if (!model || !model.search) {
        return [];
      }

      const results = await model.search(spec.text);
      const { __typename } = spec;

      return results.map(result => ({
        __typename,
        ...(result.toJSON ? result.toJSON() : result),
      }));
    },
  },
};
