import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import {
  ChangePostInput,
  ChangeProfileInput,
  ChangeUserInput,
  CreatePostInput,
  CreateProfileInput,
  CreateUserInput,
  PostType,
  ProfileType,
  UserType,
} from './graphql-model.js';
import { CreatePostDto, CreateProfileDto, CreateUserDto } from './model.js';
import { Post, PrismaClient, Profile, User } from '@prisma/client';
import { UUIDType } from './types/uuid.js';

const prisma = new PrismaClient();

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        dto: { type: new GraphQLNonNull(CreateUserInput) },
      },
      resolve: async (_source, args: Record<string, object>) => {
        return await prisma.user.create({ data: args.dto as CreateUserDto });
      },
    },
    changeUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInput) },
      },
      resolve: async (
        _source,
        { id, dto }: { id: User['id']; dto: Omit<User, 'id'> },
      ) => {
        return await prisma.user.update({ where: { id }, data: dto });
      },
    },
    createProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        dto: { type: new GraphQLNonNull(CreateProfileInput) },
      },
      resolve: async (_source, args: Record<string, object>) => {
        return await prisma.profile.create({ data: args.dto as CreateProfileDto });
      },
    },
    changeProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInput) },
      },
      resolve: async (
        _source,
        { id, dto }: { id: Profile['id']; dto: Omit<Profile, 'id' | 'userId'> },
      ) => {
        return await prisma.profile.update({ where: { id }, data: dto });
      },
    },
    createPost: {
      type: new GraphQLNonNull(PostType),
      args: {
        dto: { type: new GraphQLNonNull(CreatePostInput) },
      },
      resolve: async (_source, args: Record<string, object>) => {
        return await prisma.post.create({ data: args.dto as CreatePostDto });
      },
    },
    changePost: {
      type: new GraphQLNonNull(PostType),
      args: {
        dto: { type: new GraphQLNonNull(ChangePostInput) },
      },
      resolve: async (
        _source,
        { id, dto }: { id: Post['id']; dto: Omit<Post, 'id'> },
      ) => {
        return await prisma.post.update({
          where: { id },
          data: dto,
          include: {
            author: true,
          },
        });
      },
    },
  },
});
