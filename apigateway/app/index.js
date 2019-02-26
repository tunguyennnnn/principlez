import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';

import models from '../models';
import { schemaWithMiddleware } from './graphql';
import { authCheck } from './services/auth';

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context: async ({ req }) => {
    return { models, user: req.user };
  },
});
const app = express();

app.get('/', function(req, res) {
  res.send('Hello Worldssss');
});

app.listen(4000, function() {
  console.log('Apigateway listening on port 4000!');
});

app.all('*', cors());

app.use(authCheck);

server.applyMiddleware({ app, path: '/graphql' });
