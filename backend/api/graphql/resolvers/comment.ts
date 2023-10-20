import { GraphQLError } from "graphql";
import { Context } from "../../utils/types";

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
        const comments = await prisma.comment.findMany({
          where: { postId },
          include: {
            author: {
              select: {
                name: true,

                id: true,
              },
            },
          },
        });

        const newComments = comments.map((comment: any) => {
          return {
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt,
            author: {
              id: comment.author.id,
              name: comment.author.name,
            },
          };
        });

        return {
          comments: newComments,
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
        throw new GraphQLError(error.message, {
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
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },
  },
};
