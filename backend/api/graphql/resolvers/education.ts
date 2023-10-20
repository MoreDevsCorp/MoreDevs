import { GraphQLError } from "graphql";
import { Context } from "../../utils/types";

export default {
  Query: {
    getEducations: async (_: any, __: any, context: Context) => {
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const educations = await prisma.education.findMany({
          where: {
            userId: session.user.id,
          },
        });

        return { educations };
      } catch (error: any) {
        console.log("Error getting educations :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },
  },
  Mutation: {
    addEducation: async (
      _: any,
      args: {
        title: string;
        description: string;
        level: string;
        startedAt: string;
        endedAt: string;
        present: boolean;
      },
      context: Context
    ) => {
      const { session, prisma } = context;
      const { level, endedAt, description, present, startedAt, title } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        await prisma.education.create({
          data: {
            userId: session.user.id,
            level,
            description,
            present,
            startedAt,
            endedAt,
            title,
          },
        });

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error adding education :", error.message);
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

    deleteEducation: async (
      _: any,
      args: { educationId: string },
      context: Context
    ) => {
      const { session, prisma } = context;
      const { educationId } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        await prisma.education.delete({
          where: {
            id: educationId,
          },
        });
        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error deleting education :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },
  },
};
