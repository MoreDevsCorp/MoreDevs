import { GraphQLError } from "graphql";
import { Context } from "../../utils/types";

export default {
  Query: {
    getCompany: async (_: any, args: { id: string }, context: Context) => {
      const { session, prisma } = context;
      const { id: companyId } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const company = await prisma.company.findFirst({
          where: {
            id: companyId,
          },
        });

        if (!company) {
          throw new GraphQLError("Not Found !", {
            extensions: { code: 404 },
          });
        }

        return {
          company,
        };
      } catch (error: any) {
        console.log("Error getting company :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },
  },
  Mutation: {
    createCompany: async (
      _: any,
      args: {
        name: string;
        slogan: string;
        description: string;
        location: string;
      },
      context: Context
    ) => {
      const { session, prisma } = context;
      const { description, location, name, slogan } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const user = await prisma.user.findFirst({
          where: {
            id: session.user.id,
          },
        });

        if (!user) {
          throw new GraphQLError("User Not found", {
            extensions: { code: 404 },
          });
        }

        if (user.companyCreated) {
          throw new GraphQLError("Company Already Created", {
            extensions: { code: 400 },
          });
        }

        const company = await prisma.company.create({
          data: {
            name,
            slogan,
            location,
            description,
            userId: session.user.id,
          },
        });

        await prisma.user.update({
          where: { id: session.user.id },
          data: {
            company: {
              connect: {
                id: company.id,
              },
            },
            companyCreated: true,
          },
        });

        return {
          id: company.id,
        };
      } catch (error: any) {
        console.log("Error creating company :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },

    updateCompany: async (
      _p: any,
      args: {
        companyId: string;
        name: string;
        slogan: string;
        description: string;
        location: string;
        website: string;
      },
      context: Context
    ) => {
      const { session, prisma } = context;
      const { description, location, name, slogan, website, companyId } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const user = await prisma.user.findFirst({
          where: {
            id: session.user.id,
          },
        });

        if (!user) {
          throw new GraphQLError("User Not found", {
            extensions: { code: 404 },
          });
        }

        const company = await prisma.company.update({
          where: { id: companyId },
          data: {
            name,
            description,
            location,
            slogan,
            website,
          },
        });

        if (!company) {
          throw new GraphQLError("Company Not found", {
            extensions: { code: 404 },
          });
        }

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error updating company :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },

    // End of mutation Object
  },
};
