import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Post, User } from './graphql-model.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
      resolve: async () => {
        return prisma.post.findMany();
      },
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      resolve: async () => {
        return prisma.user.findMany();
      },
    },
  }),
});
