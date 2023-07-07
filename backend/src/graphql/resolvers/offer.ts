import { OfferType, Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";
import { Context } from "../../utils/types";

export default {
  Query: {
    getOffers: async (
      _p: any,
      args: { companyId: string },
      context: Context
    ) => {
      const { session, prisma } = context;
      const { companyId } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        let offers;

        if (companyId) {
          offers = await prisma.offer.findMany({ where: { companyId } });
        } else {
          offers = await prisma.offer.findMany({
            include: offerPopulated,
          });
        }
        return {
          offers,
        };
      } catch (error: any) {
        console.log("Error getting offers :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },

    getOffer: async (_p: any, args: { id: string }, context: Context) => {
      const { session, prisma } = context;
      const { id } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const offer = prisma.offer.findFirst({
          where: { id },
          include: {
            company: {
              select: { name: true, location: true, id: true, avatar: true },
            },
            skills: {
              select: { skill: { select: { id: true, name: true } } },
            },
          },
        });

        return {
          offer,
        };
      } catch (error: any) {
        console.log("Error getting offers :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },
  },
  Mutation: {
    createOffer: async (
      _p: any,
      args: {
        title: string;
        description: string;
        location: string;
        type: OfferType;
        skillsIds: string[];
        companyId: string;
      },
      context: Context
    ) => {
      const { session, prisma } = context;
      const { title, companyId, description, location, skillsIds, type } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        await prisma.offer.create({
          data: {
            title,
            description,
            location,
            type,
            skills: {
              createMany: {
                data: skillsIds.map((si) => ({ skillId: si })),
              },
            },
            companyId,
            taken: false,
          },
        });

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error creating Offer :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },

    updateOffer: async (
      _p: any,
      args: {
        offerId: string;
        title?: string;
        description?: string;
        location?: string;
        type?: OfferType;
        skillsIds?: string[];
        companyId?: string;
      },
      context: Context
    ) => {
      const { session, prisma } = context;
      const {
        offerId,
        title,
        companyId,
        description,
        location,
        skillsIds,
        type,
      } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        if (skillsIds?.length) {
          await prisma.offer.update({
            where: { id: offerId },
            data: {
              title,
              companyId,
              description,
              location,
              type,
              skills: {
                createMany: {
                  data: skillsIds.map((sid) => ({ skillId: sid })),
                },
              },
            },
          });
        } else {
          await prisma.offer.update({
            where: { id: offerId },
            data: {
              title,
              companyId,
              description,
              location,
              type,
            },
          });
        }

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error updating Offer :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },

    deleteOffer: async (
      _p: any,
      args: { offerId: string },
      context: Context
    ) => {
      const { session, prisma } = context;
      const { offerId } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        await prisma.offer.delete({ where: { id: offerId } });

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error deleting Offer :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },

    // End of Mutation Object
  },
};

export const offerPopulated = Prisma.validator<Prisma.OfferInclude>()({
  company: {
    select: { name: true, location: true, id: true, avatar: true },
  },
  skills: {
    select: { skill: { select: { id: true, name: true } } },
  },
});
