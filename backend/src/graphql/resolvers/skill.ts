import { GraphQLError } from "graphql";
import { Context } from "../../utils/types";

export default {
  Query: {
    getSkills: async (_: any, __: any, context: Context) => {
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const skills = await prisma.skill.findMany();

        return {
          skills,
        };
      } catch (error: any) {
        console.log("Error getting skills :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },
  },
};
