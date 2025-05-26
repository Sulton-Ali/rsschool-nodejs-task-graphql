import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType, MemberTypeId, Post, User } from './graphql-model.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
      resolve: async () => {
        return prisma.memberType.findMany();
      },
    },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      args: {
        id: { type: new GraphQLNonNull(MemberTypeId) },
      },
      resolve: async (_parent, { id }: { id: string }) => {
        return prisma.memberType.findUnique({ where: { id: id } });
      },
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      resolve: async () => {
        return prisma.user.findMany();
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
      resolve: async () => {
        return prisma.post.findMany();
      },
    },
  }),
});
