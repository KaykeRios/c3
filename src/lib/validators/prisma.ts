import { PrismaClient } from "@prisma/client"

declare global {
  // Evita recriar o PrismaClient a cada hot reload
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") global.prisma = prisma
