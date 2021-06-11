import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient
}

let client: PrismaClient
// check to use this workaround only in development and not in production
if (process.env.NODE_ENV === "production") {
  client = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  client = global.prisma
}

export const db = client