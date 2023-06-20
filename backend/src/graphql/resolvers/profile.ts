import { GraphQLError } from "graphql";
import { Context } from "../../utils/types";
import { Prisma } from "@prisma/client";

export default {
  Query: {
    getProfile: async (_: any, args: { userId: string }, context: Context) => {
      const { session, prisma } = context;
      const { userId } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const profile = await prisma.user.findFirst({
          where: { id: userId },
          include: profilePopulated,
        });

        if (!profile) {
          throw new GraphQLError("Not Found !", {
            extensions: { code: 404 },
          });
        }

        return {
          profile,
        };
      } catch (error: any) {
        console.log("Error getting profile :", error.message);
        throw new GraphQLError("Error querying profile", {
          extensions: { code: 500 },
        });
      }
    },
  },
  // Mutation : {}
};

export const profilePopulated = Prisma.validator<Prisma.UserInclude>()({
  experiences: {
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      company: {
        select: {
          id: true,
          name: true,
          location: true,
          avatar: true,
        },
      },
      startDate: true,
      endDate: true,
    },
  },

  educations: {
    select: {
      id: true,
      location: true,
      startedAt: true,
      endedAt: true,
    },
  },
});
