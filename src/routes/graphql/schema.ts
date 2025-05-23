import { GraphQLSchema } from 'graphql';
import { RootQueryType } from './query.js';
import { MutationType } from './mutation.js';
import { CreatePostInput, CreateUserInput, Post, User } from './graphql-model.js';

export const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
  types: [User, CreateUserInput, Post, CreatePostInput],
});
