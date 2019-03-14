import path from 'path';
const { makeExecutableSchema } = require('graphql-tools');
const { applyMiddleware } = require('graphql-middleware');
import middlewares from './middlewares';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

export const typeDefs = mergeTypes(
  fileLoader(path.join(__dirname, './schema')),
);

export const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers')),
);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const schemaWithMiddleware = applyMiddleware(schema, ...middlewares);
