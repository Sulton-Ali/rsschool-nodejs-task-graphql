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

export const Profile = new GraphQLObjectType({
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
      type: new GraphQLNonNull(GraphQLString),
      description: 'The member type of profile',
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

export const Post = new GraphQLObjectType({
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
  },
});

export const User = new GraphQLObjectType({
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
      type: Profile,
      description: 'The profile of user',
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
      description: 'The posts of user',
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      description: 'The userSubscribedTo of user',
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      description: 'The subscribedToUser of user',
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
