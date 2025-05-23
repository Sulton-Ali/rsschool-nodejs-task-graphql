import { PrismaClient } from '@prisma/client';
import { FastifyRequest } from 'fastify';

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
