import _ from 'lodash';
import esClient from './client';

async function createIndex(indexName) {
  try {
    return await esClient.indices.create({
      index: indexName,
    });
  } catch (e) {
    // console.log(e);
  }
}

async function addMappingToIndex(indexName, mappingType, mapping) {
  return await esClient.indices.putMapping({
    index: indexName,
    type: mappingType,
    body: mapping,
  });
}

export async function addMappings(schema) {
  for (const [type, mapping] of _.entries(schema)) {
    try {
      await createIndex(type);
      await addMappingToIndex(type, type, mapping);
    } catch (e) {
      // console.log(`add mappiing ${type} error:`, e);
    }
  }
}
