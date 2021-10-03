import { objectType, extendType, intArg, stringArg } from "nexus"
import { User } from "./User"

export const Link = objectType({
  name: "Link",
  definition(t) {
    t.string("id")
    t.string("title")
    t.string("url")
    t.string("description")
    t.string("imageUrl")
    t.string("category")
    t.list.field("users", {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.link
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .users()
      },
    })
  },
})

export const Edge = objectType({
  name: "Edge",
  definition(t) {
    t.string("cursor")
    t.field("node", {
      type: Link,
    })
  },
})

export const pageInfo = objectType({
  name: "pageInfo",
  definition(t) {
    t.string("endCursor")
    t.boolean("hasNextPage")
  },
})

export const Response = objectType({
  name: "Response",
  definition(t) {
    t.field("pageInfo", { type: pageInfo })
    t.list.field("edges", {
      type: Edge,
    })
  },
})

export const LinksQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("links", {
      type: "Response",
      args: {
        first: intArg(),
        after: stringArg(),
      },
      async resolve(_, args, ctx) {
        let queryResult = null

        if (args.after) {
          queryResult = await ctx.prisma.link.findMany({
            take: args.first,
            skip: 1,
            cursor: {
              id: args.after,
            },
          })
        } else {
          queryResult = await ctx.prisma.link.findMany({
            take: args.first,
          })
        }
        if (queryResult.length > 0) {
          const lastLinkInResults = queryResult[queryResult.length - 1]
          const myCursor = lastLinkInResults.id

          const secondQueryResults = await ctx.prisma.link.findMany({
            take: args.first,
            cursor: {
              id: myCursor,
            },
          })
          const result = {
            pageInfo: {
              endCursor: myCursor,
              hasNextPage: secondQueryResults.length >= args.first,
            },
            edges: queryResult.map((link) => ({
              cursor: link.id,
              node: link,
            })),
          }
          return result
        }
        return {
          pageInfo: {
            endCursor: null,
            hasNextPage: false,
          },
          edges: [],
        }
      },
    })
  },
})
