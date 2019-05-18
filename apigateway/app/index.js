import '@babel/polyfill';
import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';

import models from '../models';
import { schemaWithMiddleware } from './graphql';
import middlewares from './graphql/middlewares';
import '../elastics';
console.log(process.env.ES_HOST);

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  uploads: {
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20,
  },
  middlewares,
  context: async ({ req }) => {
    return { models, req };
  },
});

const app = express();

app.listen(4000, function() {
  console.log('Apigateway listening on port 4000!');
});

app.use(bodyParser.json());
app.all('*', cors());

server.applyMiddleware({ app, path: '/graphql' });

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});
