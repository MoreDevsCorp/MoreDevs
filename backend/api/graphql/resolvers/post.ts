import { GraphQLError } from "graphql";
import { Context } from "../../utils/types";
import { Prisma } from "@prisma/client";

export default {
  Query: {
    getPosts: async (_: any, args: { userId: string }, context: Context) => {
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const exisitingUser = await prisma.user.findFirst({
          where: { id: args.userId },
        });

        if (!exisitingUser) {
          throw new GraphQLError("Not found user !", {
            extensions: { code: 404 },
          });
        }

        const posts = await prisma.post.findMany({
          where: {
            authorId: args.userId,
          },
          select: postPopulated,
          orderBy: { createdAt: "desc" },
        });

        const newPosts = posts.map((post: any) => {
          if (post.likes.some((l: any) => l.userId === session.user?.id)) {
            return { ...post, isLiked: true };
          }
          return { ...post, isLiked: false };
        });

        return {
          posts: newPosts,
        };
      } catch (error: any) {
        console.log("Error getting posts :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },
  },
  Mutation: {
    createPost: async (_: any, args: { content: string }, context: Context) => {
      const { session, prisma } = context;
      const { content } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        await prisma.post.create({
          data: {
            content,
            authorId: session.user.id,
          },
        });

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error creating post :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },

    updatePost: async (
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
        await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            content,
          },
        });

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error updating post :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },

    deletePost: async (_: any, args: { postId: string }, context: Context) => {
      const { session, prisma } = context;
      const { postId } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        await prisma.post.delete({ where: { id: postId } });
        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error deleting post :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },

    like: async (_: any, args: { postId: string }, context: Context) => {
      const { session, prisma } = context;
      const { postId } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        await prisma.postLike.create({
          data: {
            postId,
            userId: session.user.id,
          },
        });

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error liking post :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },
    dislike: async (_: any, args: { postId: string }, context: Context) => {
      const { session, prisma } = context;
      const { postId } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        await prisma.postLike.delete({
          where: {
            postId_userId: {
              postId: postId,
              userId: session.user.id,
            },
          },
        });
        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error liking post :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },
  },
};

export const postPopulated = Prisma?.validator<Prisma.PostSelect>()({
  id: true,
  author: {
    select: {
      id: true,
      image: true,
      name: true,
      job_title: true,
    },
  },
  comments: {
    select: {
      id: true,
    },
  },
  likes: {
    select: {
      id: true,
      userId: true,
    },
  },
  content: true,
  createdAt: true,
});
