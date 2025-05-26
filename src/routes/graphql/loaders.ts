import { User } from '@prisma/client';
import DataLoader from 'dataloader';
import { prisma } from './prisma.js';

export const createUserSubscribedToLoader = () =>
  new DataLoader(async (subscriberIds) => {
    const links = await prisma.subscribersOnAuthors.findMany({
      where: { subscriberId: { in: subscriberIds as string[] } },
      include: { author: true },
    });

    const map = subscriberIds.reduce<Record<string, User[]>>((acc, id) => {
      acc[id as string] = [];
      return acc;
    }, {});

    for (const link of links) {
      map[link.subscriberId].push(link.author);
    }

    return subscriberIds.map((id) => map[id as string]) as unknown as User[];
  });

export const createSubscribedToUserLoader = () =>
  new DataLoader(async (authorIds) => {
    const links = await prisma.subscribersOnAuthors.findMany({
      where: { authorId: { in: authorIds as string[] } },
      include: { author: true },
    });

    const map = authorIds.reduce<Record<string, User[]>>((acc, id) => {
      acc[id as string] = [];
      return acc;
    }, {});

    for (const link of links) {
      map[link.subscriberId].push(link.author);
    }

    return authorIds.map((id) => map[id as string]) as unknown as User[];
  });
