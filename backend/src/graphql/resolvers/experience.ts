import { GraphQLError } from "graphql";
import { Context } from "../../utils/types";

export default {
  Query: {
    getExperiences: async (_: any, __: any, context: Context) => {
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const experiences = await prisma.experience.findMany({
          where: {
            userId: session.user.id,
          },
        });

        return { experiences };
      } catch (error: any) {
        console.log("Error getting experiences :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },
  },
  Mutation: {
    addExperience: async (
      _: any,
      args: {
        title: string;
        description: string;
        location: string;
        company: string;
        startDate: string;
        endDate: string;
        present: boolean;
      },
      context: Context
    ) => {
      const { session, prisma } = context;
      const {
        company,
        endDate,
        description,
        location,
        present,
        startDate,
        title,
      } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        await prisma.experience.create({
          data: {
            userId: session.user.id,
            company,
            description,
            location,
            present,
            startDate,
            title,
            endDate,
          },
        });

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error adding experience :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }

      // thats update one
      // try {
      //   await prisma.user.update({
      //     where: {
      //       id: session.user.id,
      //     },
      //     data: {
      //       experiences: {
      //         create: {
      //           description,
      //           location,
      //           present,
      //           startDate,
      //           title,
      //           endDate,
      //         },
      //       },
      //     },
      //   });

      //   return {
      //     success: true,
      //   };
      // } catch (error: any) {
      //   console.log("Error adding experience :", error.message);
      //   throw new GraphQLError(error.message, {
      //     extensions: { code: 500 },
      //   });
      // }
    },
  },
};
