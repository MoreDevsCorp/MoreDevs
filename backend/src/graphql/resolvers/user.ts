import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import { Context } from "../../utils/types";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

const resolvers = {
  Query: {
    getUser: async (_: any, args: { token: string }, context: Context) => {
      const { session, prisma } = context;
      const { token } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const user = await prisma.user.findFirst({
          where: { id: session.user.id },
          select: {
            id: true,
            email: true,
            image: true,
            token: true,
            name: true,
            companyCreated: true,
            company: {
              select: {
                id: true,
                name: true,
              },
            },
            password: false,
          },
        });

        return {
          user,
        };
      } catch (error: any) {
        console.log("Error getting user :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },
    searchUsers: () => {},
    loginUser: async (
      _: any,
      args: { email: string; password: string },
      context: Context
    ): Promise<User> => {
      const { prisma } = context;
      const { email, password } = args;

      try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          throw new GraphQLError("User not found !", {
            extensions: { code: 404 },
          });
        }

        const comparedPassword = await bcrypt.compare(
          password,
          user.password as string
        );

        if (!comparedPassword) {
          throw new GraphQLError("Wrong credentials !", {
            extensions: { code: 401 },
          });
        }

        return {
          ...user,
        };
      } catch (error: any) {
        console.log("Error Logging in user : ", error.message);
        throw new GraphQLError("Error logging in user", {
          extensions: { code: 500 },
        });
      }
    },
  },
  Mutation: {
    registerUser: async (
      _: any,
      args: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      },
      context: Context
    ): Promise<User> => {
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

        const newUser = await prisma.user.create({
          data: {
            name: `${firstName} ${lastName}`,
            first_name: firstName,
            last_name: lastName,
            email,
            password: hashedPassword,
          },
        });

        const token = jwt.sign(
          {
            id: newUser.id,
            email: newUser.email,
          },
          process.env.JWT_SECRET as string,
          { expiresIn: "72h" }
        );

        const updatedUser = await prisma.user.update({
          where: { id: newUser.id },
          data: {
            token,
          },
        });

        return {
          ...updatedUser,
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
        const sessionId = session.user.id;
        await prisma.user.update({
          where: { id: sessionId },
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

    // End of Mutation Object
  },
  //   Subscription: {},
};

export default resolvers;
