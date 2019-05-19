import { insert, search, deleteDoc } from './actions';

export async function insertStory(id, body) {
  return await insert({
    indexName: 'story',
    mappingType: 'story',
    id,
    body,
  });
}

export async function searchStory(text) {
  const result = await search({
    indexName: 'story',
    mappingType: 'story',
    payload: {
      _source: ['title'],
      query: {
        multi_match: {
          query: text,
          fields: ['title', 'body'],
        },
      },
      size: 10,
    },
  });

  const { hits } = result;
  return hits.hits.map(h => h._id);
}

export async function deleteStoryById(id) {
  return await deleteDoc({ indexName: 'story', mappingType: 'story', id });
}
