import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const withConnectionLimit = (url: string | undefined) => {
  if (!url) return url
  if (url.includes('connection_limit=')) return url
  return `${url}${url.includes('?') ? '&' : '?'}connection_limit=30`
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: { url: withConnectionLimit(process.env.DATABASE_URL) },
    },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma