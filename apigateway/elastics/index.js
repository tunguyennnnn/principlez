import esClient from './client';

export async function createIndex(indexName) {
  return await esClient.indices.create({
    index: indexName,
  });
}

export async function addMappingToIndex(indexName, mappingType, mapping) {
  return await esClient.indices.putMapping({
    index: indexName,
    type: mappingType,
    body: mapping,
  });
}
