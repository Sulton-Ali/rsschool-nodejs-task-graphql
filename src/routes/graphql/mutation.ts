import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { CreatePostInput, CreateUserInput, Post, User } from './graphql-model.js';
import { CreatePostDto, CreateUserDto } from './model.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPost: {
      type: new GraphQLNonNull(Post),
      args: {
        dto: { type: new GraphQLNonNull(CreatePostInput) },
      },
      resolve: async (_source, args: Record<string, object>) => {
        return await prisma.post.create({ data: args.dto as CreatePostDto });
      },
    },
    createUser: {
      type: new GraphQLNonNull(User),
      args: {
        dto: { type: new GraphQLNonNull(CreateUserInput) },
      },
      resolve: async (_source, args: Record<string, object>) => {
        return await prisma.user.create({ data: args.dto as CreateUserDto });
      },
    },
  },
});
