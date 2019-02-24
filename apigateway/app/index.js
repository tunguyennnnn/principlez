import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';

import models from '../models';
import schema from './graphql';
import { authCheck } from './services/auth';

const app = express();

app.get('/', function(req, res) {
  res.send('Hello Worldssss');
});

app.listen(4000, function() {
  console.log('Apigateway listening on port 4000!');
});

app.all('*', cors());

app.use(authCheck);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: { models, user: req.user },
  })),
);
