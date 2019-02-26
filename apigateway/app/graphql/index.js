import path from 'path';
const { makeExecutableSchema } = require('graphql-tools');
const { applyMiddleware } = require('graphql-middleware');
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

export const typeDefs = mergeTypes(
  fileLoader(path.join(__dirname, './schema')),
);

export const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers')),
);

const loggingMiddleware = async (resolve, root, args, context, info) => {
  console.log(`Input arguments: ${JSON.stringify(args)}`);
  const result = await resolve(root, args, context, info);
  console.log(`Result: ${JSON.stringify(result)}`);
  return result;
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const schemaWithMiddleware = applyMiddleware(schema, loggingMiddleware);

export const middlewares = {
  test: (resolve, root, args, context, info) => {
    console.log('reachhhhhhhhh', args);
    return resolve(root, args, context, info);
  },
};
