import '@babel/polyfill';
import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';

import models from '../models';
import { schemaWithMiddleware, typeDefs, resolvers } from './graphql';
import { authCheck } from './services/auth';
import { build } from 'protobufjs';

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  uploads: {
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20,
  },
  context: async ({ req }) => {
    return { models, user: req.user };
  },
});

const app = express();

app.listen(4000, function() {
  console.log('Apigateway listening on port 4000!');
});

app.use(bodyParser.json());
app.all('*', cors());

app.use(authCheck);

server.applyMiddleware({ app, path: '/graphql' });

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});
