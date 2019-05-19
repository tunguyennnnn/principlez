import esClient from './client';

export async function insert({ id, indexName, mappingType, body }) {
  return await esClient.index({
    index: indexName,
    type: mappingType,
    id,
    body,
  });
}

export async function search({ indexName, mappingType, payload }) {
  return await esClient.search({
    index: indexName,
    type: mappingType,
    body: payload,
  });
}

export async function deleteDoc({ indexName, mappingType, id }) {
  return await esClient.delete({
    index: indexName,
    type: mappingType,
    id,
  });
}
