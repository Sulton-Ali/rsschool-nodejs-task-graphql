import { PrismaClient } from '@prisma/client';
import { FastifyRequest } from 'fastify';
import { MemberTypeId } from '../member-types/schemas.js';

export interface GraphQLContext {
  prisma: PrismaClient;
  request: FastifyRequest;
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
