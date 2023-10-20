import { GraphQLError } from "graphql";
import { Context } from "../../utils/types";
import { postPopulated } from "./post";

export default {
  Query: {
    getFeed: async (_p: any, _a: any, context: Context) => {
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const feed = await prisma.post.findMany({
          select: postPopulated,
          orderBy: { createdAt: "desc" },
        });

        const newPosts = feed.map((post: any) => {
          if (post.likes.some((l: any) => l.userId === session.user?.id)) {
            return { ...post, isLiked: true };
          }
          return { ...post, isLiked: false };
        });

        return {
          feed: newPosts,
        };
      } catch (error: any) {
        console.log("Error getting Feed:", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },
  },
};
