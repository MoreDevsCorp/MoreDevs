import { GraphQLError } from "graphql";
import { Context, DecodedToken } from "../../utils/types";
import jwt from "jsonwebtoken";

export default {
  Query: {
    getFollowers: async (_p: any, _a: any, context: Context) => {
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        // Getting the followers of a specific user
        const followers = await prisma.user.findUnique({
          where: {
            id: session.user.id,
          },
          include: {
            followers: {
              select: {
                follower: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
              },
            },
          },
        });

        return {
          followers,
        };
      } catch (error: any) {
        console.log("Error getting followers :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },

    getFollowing: async (_p: any, _a: any, context: Context) => {
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        // Getting the following of a specific user
        const following = await prisma.user.findUnique({
          where: {
            id: session.user.id,
          },
          include: {
            following: {
              select: {
                following: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
              },
            },
          },
        });

        return {
          following,
        };
      } catch (error: any) {
        console.log("Error getting following :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },
  },
  Mutation: {
    // following logic
    follow: async (_p: any, args: { userId: string }, context: Context) => {
      const { session, prisma, pubsub } = context;
      const { userId } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        // await prisma.follows.create({
        //   data: {
        //     followerId: sessionId,
        //     followingId: userId,
        //   },
        // });

        await prisma.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            following: {
              create: {
                followerId: session.user.id,
              },
            },
          },
        });

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            followers: {
              create: {
                followingId: session.user.id,
              },
            },
          },
        });

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error attempting to follow this user :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },

    deleteFollow: async (
      _p: any,
      args: { userId: string },
      context: Context
    ) => {
      const { session, prisma } = context;
      const { userId } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        // await prisma.follows.delete({
        //   where: {
        //     followerId_followingId: {
        //       followerId: sessionId,
        //       followingId: userId,
        //     },
        //   },
        // });

        await prisma.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            following: {
              delete: {
                followerId_followingId: {
                  followerId: session.user.id,
                  followingId: userId,
                },
              },
            },
          },
        });

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            followers: {
              delete: {
                followerId_followingId: {
                  followerId: session.user.id,
                  followingId: userId,
                },
              },
            },
          },
        });
      } catch (error: any) {
        console.log(
          "Error attempting to remove the following !",
          error.message
        );
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },
  },
};
