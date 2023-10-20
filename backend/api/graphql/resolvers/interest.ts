import { GraphQLError } from "graphql";
import { Context } from "../../utils/types";

export default {
  Query: {
    getInterests: async (_: any, __: any, context: Context) => {
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const interests = await prisma.interest.findMany();

        return {
          interests,
        };
      } catch (error: any) {
        console.log("Error getting interests :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },
  },
};
