import { GraphQLError } from "graphql";
import { Context } from "../../utils/types";

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
      } catch (error: any) {
        console.log("Error getting Feed:", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },
  },
};
