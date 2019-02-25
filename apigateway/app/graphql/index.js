import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

export const typeDefs = mergeTypes(
  fileLoader(path.join(__dirname, './schema')),
);

export const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers')),
);

export const middlewares = {
  test: (resolve, root, args, context, info) => {
    console.log('reachhhhhhhhh', args);
    return resolve(root, args, context, info);
  },
};
