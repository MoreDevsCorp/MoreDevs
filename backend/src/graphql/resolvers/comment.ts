import { GraphQLError } from "graphql";
import { Context } from "../../utils/types";
import jwt from "jsonwebtoken";

export default {
  Query: {
    getComments: async (_: any, args: { postId: string }, context: Context) => {
      const { session, prisma } = context;
      const { postId } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const comments = await prisma.comment.findMany({ where: { postId } });

        return {
          comments,
        };
      } catch (error: any) {
        console.log("Error getting comments :", error.message);
        throw new GraphQLError("Error querying comments", {
          extensions: { code: 500 },
        });
      }
    },
  },

  Mutation: {
    createComment: async (
      _: any,
      args: { postId: string; content: string },
      context: Context
    ) => {
      const { session, prisma } = context;
      const { postId, content } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        await prisma.comment.create({
          data: {
            content,
            postId,
            authorId: session.user.id,
          },
        });
        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error creating comment: ", error.message);
        throw new GraphQLError("Error creating comment", {
          extensions: { code: 500 },
        });
      }
    },
    deleteComment: async (
      _: any,
      args: { commentId: string },
      context: Context
    ) => {
      const { session, prisma } = context;
      const { commentId } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        await prisma.comment.delete({ where: { id: commentId } });
        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error deleting comment: ", error.message);
        throw new GraphQLError("Error deleting comment", {
          extensions: { code: 500 },
        });
      }
    },
  },
};
