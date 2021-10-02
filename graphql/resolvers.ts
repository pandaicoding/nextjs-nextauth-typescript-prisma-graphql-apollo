import prisma from "../lib/prisma"

export const resolvers = {
  Query: {
    links: async (_parent: any, _args: any, context: any) =>
      await context.prisma.link.findMany(),
  },
}
