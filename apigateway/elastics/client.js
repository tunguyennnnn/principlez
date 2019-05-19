import elasticsearch from 'elasticsearch';
import { addMappings } from './setup';
import schema from './schema';

export const indexName = 'principlez';

const port = 9200;
const host = process.env.ES_HOST || 'localhost';
const client = new elasticsearch.Client({ host: { host, port } });

async function checkConnection() {
  let isConnected = false;
  while (!isConnected) {
    console.log('Connecting to ES');
    try {
      const health = await client.cluster.health({});
      console.log(health);
      isConnected = true;

      await addMappings(schema);
    } catch (err) {
      console.log('Connection Failed, Retrying...', err);
    }
  }
}

checkConnection();
export default client;
