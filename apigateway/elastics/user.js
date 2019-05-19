import { insert, search } from './actions';

export async function insertUser(id, title, body) {
  return await insert({
    indexName: 'user',
    mappingType: 'user',
    id,
    body,
  });
}

export async function searchUser(text) {
  const results = await search({
    indexName: 'user',
    mappingType: 'user',
    payload: {
      query: {
        match: {
          fullname: text,
        },
      },
    },
  });
  console.log(results);
}
