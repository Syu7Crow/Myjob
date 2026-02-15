import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
// @ts-ignore
import pg from 'pg'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// 接続プールを作成
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ 
    // @ts-ignore
    adapter: adapter 
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma