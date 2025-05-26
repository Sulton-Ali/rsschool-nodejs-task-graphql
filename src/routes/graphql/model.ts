import { PrismaClient, User } from '@prisma/client';
import { FastifyRequest } from 'fastify';
import { MemberTypeId } from '../member-types/schemas.js';
import DataLoader from 'dataloader';

export type TDataLoader = DataLoader<unknown, User>;
export interface GraphQLContext {
  prisma: PrismaClient;
  request: FastifyRequest;
  loaders: {
    userSubscribedTo: TDataLoader;
    subscribedToUser: TDataLoader;
  };
}

export interface CreatePostDto {
  title: string;
  content: string;
  authorId: string;
}

export interface CreateUserDto {
  name: string;
  balance: number;
}

export interface CreateProfileDto {
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: MemberTypeId;
}
