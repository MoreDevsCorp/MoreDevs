import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import { Context } from "../../utils/types";

const resolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUser: async (
      _: any,
      args: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      },
      context: Context
    ) => {
      const { firstName, lastName, email, password } = args;
      const { prisma } = context;

      try {
        const exisitingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (exisitingUser) {
          throw new GraphQLError("User Already Exists", {
            extensions: { code: 500 },
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
          data: {
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword,
          },
        });

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error creating User : ", error.message);

        throw new GraphQLError("Error creating User", {
          extensions: { code: 500 },
        });
      }
    },

    setUpUser: async (
      _: any,
      args: {
        bio: string;
        skillIds: string[];
        interestsIds: string[];
      },
      context: Context
    ) => {
      const { session, prisma } = context;
      const { bio, skillIds, interestsIds } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        await prisma.user.update({
          where: { id: session.user.id },
          data: {
            bio,
            skills: {
              createMany: {
                data: skillIds.map((skill) => ({ skillId: skill })),
              },
            },
            interests: {
              createMany: {
                data: interestsIds.map((interest) => ({
                  interestId: interest,
                })),
              },
            },
          },
        });

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error Setting up user : ", error.message);
        throw new GraphQLError("Error Setting up user", {
          extensions: { code: 500 },
        });
      }
    },
  },
  //   Subscription: {},
};

export default resolvers;
