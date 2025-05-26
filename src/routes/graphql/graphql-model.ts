import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './types/uuid.js';
import { Profile, User } from '@prisma/client';
import { GraphQLContext } from './model.js';
import { prisma } from './prisma.js';

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: {
      value: 'BASIC',
      description: 'Basic value of member type',
    },
    BUSINESS: {
      value: 'BUSINESS',
      description: 'Busicess value of member type',
    },
  },
});

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: {
      type: new GraphQLNonNull(MemberTypeId),
    },
    discount: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    postsLimitPerMonth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
});

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: {
      type: new GraphQLNonNull(UUIDType),
      description: 'The id of profile',
    },
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: "The identificator of user's gender",
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The year of birth of user',
    },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      description: 'The member type of profile',
      resolve: async (profile: Profile) => {
        return prisma.memberType.findUnique({ where: { id: profile.memberTypeId } });
      },
    },
  },
});

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'The gender of user',
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The year of birth',
    },
    userId: {
      type: new GraphQLNonNull(UUIDType),
      description: 'The id of author of post',
    },
    memberTypeId: {
      type: new GraphQLNonNull(MemberTypeId),
      description: 'The member type of profile',
    },
  },
});

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: {
      type: GraphQLBoolean,
      description: 'The gender of user',
    },
    yearOfBirth: {
      type: GraphQLInt,
      description: 'The year of birth',
    },
    memberTypeId: {
      type: MemberTypeId,
      description: 'The member type of profile',
    },
  },
});

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: {
      type: new GraphQLNonNull(UUIDType),
      description: 'The id of post',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of post',
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of post',
    },
    authorId: {
      type: new GraphQLNonNull(UUIDType),
      description: "Id of posts's author",
    },
  },
});

export const UserType = new GraphQLObjectType<User, GraphQLContext>({
  name: 'User',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
      description: 'The id of user',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of user',
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'The balance of user',
    },
    profile: {
      type: ProfileType,
      description: 'The profile of user',
      resolve: async (user: User) => {
        return prisma.profile.findUnique({
          where: { userId: user.id },
          include: {
            memberType: true,
          },
        });
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
      description: 'The posts of user',
      resolve: async (user: User) => {
        console.log('Posts called');

        return prisma.post.findMany({
          where: { authorId: user.id },
          include: {
            author: true,
          },
        });
      },
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      description: 'The userSubscribedTo of user',
      resolve: async (user, _args, context) => {
        return await context.loaders.userSubscribedTo.load(user.id);
      },
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      description: 'The subscribedToUser of user',
      resolve: async (user: User, _args, context) => {
        return await context.loaders.subscribedToUser.load(user.id);
      },
    },
  }),
});

export const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of user',
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'The balance of user',
    },
  },
});

export const ChangeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: {
      type: GraphQLString,
      description: 'The name of user',
    },
    balance: {
      type: GraphQLFloat,
      description: 'The balance of user',
    },
  },
});

export const CreatePostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of post',
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The content of post',
    },
    authorId: {
      type: new GraphQLNonNull(UUIDType),
      description: 'The id of author of post',
    },
  },
});

export const ChangePostInput = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    title: {
      type: GraphQLString,
      description: 'The title of post',
    },
    content: {
      type: GraphQLString,
      description: 'The content of post',
    },
  },
});
