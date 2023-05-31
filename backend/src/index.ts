import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import { getSession } from "next-auth/react";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import { PubSub } from "graphql-subscriptions";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

import { Context, SubscriptionContext } from "./utils/types";
import { Session } from "./utils/types";
import { PrismaClient } from "@prisma/client";

async function main() {
  const app = express();

  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const prisma = new PrismaClient();
  const pubsub = new PubSub();

  // websockets Server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql/subscriptions",
  });

  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx: SubscriptionContext): Promise<Context> => {
        if (ctx.connectionParams && ctx.connectionParams.session) {
          return {
            prisma,
            session: ctx.connectionParams.session,
            pubsub,
          };
        }

        return {
          prisma,
          pubsub,
          session: null,
        };
      },
    },
    wsServer
  );

  // ------------Apollo Server

  const server = new ApolloServer<Context>({
    schema,
    plugins: [
      // Proper shutdown for the HTTP Server
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  const context = async ({ req }: any): Promise<Context> => {
    const session = (await getSession({ req })) as Session;

    return { session, prisma, pubsub };
  };

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: process.env.CLIENT_ORIGIN,
      credentials: true,
    }),
    json(),
    expressMiddleware(server, { context })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
}

main().then(() => {
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
});
