import { PrismaClient } from '@prisma/client';

// Prevent creating multiple instances in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient =
  globalThis.prisma || new PrismaClient({ log: ['warn', 'error'] });

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;