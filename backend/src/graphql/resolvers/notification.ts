import { GraphQLError } from "graphql";
import { Context, NotificationPopulated } from "../../utils/types";
import { NotificationType } from "@prisma/client";
import { withFilter } from "graphql-subscriptions";
import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";

export default {
  Query: {
    getAllNotifications: async (_: any, __: any, context: Context) => {
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const notifications = await prisma.notification.findMany({
          where: {
            recipientId: session.user.id,
          },
          select: notificationPopulated,
        });

        return {
          notifications,
        };
      } catch (error: any) {
        console.log("Error getting notifications :", error.message);
        throw new GraphQLError("Error querying notifications", {
          extensions: { code: 500 },
        });
      }
    },

    // End of Query Object
  },

  Mutation: {
    createNotification: async (
      parent: any,
      args: { recipientId: string; type: NotificationType },
      context: Context
    ) => {
      const { session, prisma, pubsub } = context;
      const { recipientId, type } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const notification = await prisma.notification.create({
          data: {
            senderId: session.user.id,
            recipientId,
            type,
          },
          select: notificationPopulated,
        });

        // emit a NOTIFICATION_CREATED event using pubsub
        pubsub.publish("NOTIFICATION_CREATED", {
          notificationCreated: notification,
        });

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error creating notification :", error.message);
        throw new GraphQLError("Error creating notification ", {
          extensions: { code: 500 },
        });
      }
    },

    // End of Mutation Object
  },

  Subscription: {
    notificationCreated: {
      subscribe: withFilter(
        (_p: any, _a: any, context: Context) => {
          const { pubsub } = context;
          return pubsub.asyncIterator(["NOTIFICATION_CREATED"]);
        },
        (
          payload: NotificationCreatedSubscriptionPayload,
          _: any,
          context: Context
        ) => {
          const { session } = context;

          if (!session?.user) {
            throw new GraphQLError("You're not authenticated !", {
              extensions: { code: 401 },
            });
          }

          const {
            notificationCreated: { recipient },
          } = payload;

          if (!session?.user) {
            throw new GraphQLError("You're not authenticated !", {
              extensions: { code: 401 },
            });
          }
          const isUserRecipient = recipient.id === session.user.id;

          return isUserRecipient;
        }
      ),
    },

    // End of Subscription Object
  },
};

export interface NotificationCreatedSubscriptionPayload {
  notificationCreated: NotificationPopulated;
}

// export const recipientPopulated = Prisma.validator<Prisma.NotificationRecipientInclude>()({
//     recipient : {
//         select : {
//             id : true,
//             name : true,
//             image : true,
//         }
//     }
// })

export const notificationPopulated =
  Prisma.validator<Prisma.NotificationSelect>()({
    recipient: {
      select: {
        id: true,
        name: true,
        image: true,
      },
    },
    sender: {
      select: {
        id: true,
        name: true,
        image: true,
      },
    },
    type: true,
  });
