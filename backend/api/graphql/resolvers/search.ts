// import { GraphQLError } from "graphql";
// import { Context } from "../../utils/types";
// import { Prisma } from "@prisma/client";

// export default {
//   Query: {
//     getQueryData: async (
//       _: any,
//       args: { searchQuery: string },
//       context: Context
//     ) => {
//       const { session, prisma } = context;
//       const { searchQuery } = args;

//       if (!session?.user) {
//         throw new GraphQLError("You're not authenticated !", {
//           extensions: { code: 401 },
//         });
//       }
//       try {
//         // const result = await prisma.user.findMany({
//         //   where: {
//         //     first_name: {
//         //       contains: searchQuery,
//         //     },
//         //   },
//         // });
//         // return result;
//       } catch (error: any) {
//         console.log("Error getting profile :", error.message);
//         throw new GraphQLError(error.message, {
//           extensions: { code: 500 },
//         });
//       }
//     },
//   },
// };
