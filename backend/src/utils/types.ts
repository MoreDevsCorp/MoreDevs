import { ISODateString } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { Context as GQLContext } from "graphql-ws/lib/server";
import { PubSub } from "graphql-subscriptions";
import { Prisma } from "@prisma/client";

export interface Context {
  session: Session | null;
  prisma: PrismaClient;
  pubsub: PubSub;
}

export interface Session {
  user?: User;
  expires: ISODateString;
}
/********************************* */

export interface User {
  id: string;
  name: string;
  image: string;
  email: string;
}

export interface SubscriptionContext extends GQLContext {
  connectionParams: {
    session?: Session;
  };
}

/**
 *  ?--------------------Notification
 *  */

// export type Recipient = {
//   include: {
//     id: true;
//     name: true;
//     image: true;
//   };
// };

export type NotificationPopulated = Prisma.NotificationGetPayload<{
  include: {
    recipient: {
      select: {
        id: true;
        name: true;
        image: true;
      };
    };
    sender: {
      select: {
        id: true;
        name: true;
        image: true;
      };
    };
  };
}>;
