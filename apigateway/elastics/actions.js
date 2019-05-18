import esClient from './client';

export function insert({id, indexName, mappingType, body}) {
  return await esClient.index({
    index: indexName,
    type: mappingType,
    id,
    body
  });
}

export function search({indexName, mappingType, payload}) {
  return await esClient.search({
    index: indexName,
    type: mappingType,
    body: payload
  })
}