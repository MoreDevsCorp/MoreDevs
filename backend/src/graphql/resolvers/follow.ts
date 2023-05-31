import { GraphQLError } from "graphql";
import { Context, DecodedToken } from "../../utils/types";
import jwt from "jsonwebtoken";

export default {
  Query: {
    getFollowers: async (_p: any, _a: any, context: Context) => {
      const { session, prisma } = context;

      if (!session?.token) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const decodedToken = jwt.verify(
          session.token,
          process.env.JWT_SECRET as string
        );
        const sessionId = (<any>decodedToken).id;
        // Getting the followers of a specific user
        const followers = await prisma.user.findUnique({
          where: {
            id: sessionId,
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
        throw new GraphQLError("Error querying followers", {
          extensions: { code: 500 },
        });
      }
    },

    getFollowing: async (_p: any, _a: any, context: Context) => {
      const { session, prisma } = context;

      if (!session?.token) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const decodedToken = jwt.verify(
          session.token,
          process.env.JWT_SECRET as string
        );
        const sessionId = (<any>decodedToken).id;
        // Getting the following of a specific user
        const following = await prisma.user.findUnique({
          where: {
            id: sessionId,
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
        throw new GraphQLError("Error querying following", {
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

      if (!session?.token) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const decodedToken = jwt.verify(
          session.token,
          process.env.JWT_SECRET as string
        );
        const sessionId = (<any>decodedToken).id;
        // await prisma.follows.create({
        //   data: {
        //     followerId: sessionId,
        //     followingId: userId,
        //   },
        // });

        await prisma.user.update({
          where: {
            id: sessionId,
          },
          data: {
            following: {
              create: {
                followerId: sessionId,
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
                followingId: sessionId,
              },
            },
          },
        });

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error attempting to follow this user :", error.message);
        throw new GraphQLError("Error attempting to follow this user", {
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

      if (!session?.token) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const decodedToken = jwt.verify(
          session.token,
          process.env.JWT_SECRET as string
        );
        const sessionId = (<any>decodedToken).id;
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
            id: sessionId,
          },
          data: {
            following: {
              delete: {
                followerId_followingId: {
                  followerId: sessionId,
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
                  followerId: sessionId,
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
        throw new GraphQLError("Error attempting to remove the following", {
          extensions: { code: 500 },
        });
      }
    },
  },
};
