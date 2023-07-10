import { GraphQLError } from "graphql";
import { Context } from "../../utils/types";

export default {
  Query: {
    getSkills: async (_: any, args: { userId?: string }, context: Context) => {
      const { session, prisma } = context;
      const { userId } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        let skills;

        if (userId) {
          skills = await prisma.userSkill.findMany({
            where: {
              userId,
            },
            include: {
              skill: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          });

          skills = skills.map((skill) => ({
            id: skill.skill?.id,
            name: skill.skill?.name,
          }));
        } else {
          skills = await prisma.skill.findMany();
        }

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
