import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import http from "http";
import cors from "cors";
import { json } from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/authRoutes";

import { PubSub } from "graphql-subscriptions";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

import { Context, SubscriptionContext, User } from "./utils/types";
import { Session } from "./utils/types";
import { GraphQLError } from "graphql";

import prisma from "./lib/prisma";

async function main() {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const app = express();

  const httpServer = http.createServer(app);

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
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer")) {
      throw new GraphQLError("you must be logged in to query this schema", {
        extensions: {
          code: 401,
        },
      });
    }

    token = token.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

    const user = await prisma.user.findFirst({
      where: {
        token,
      },
      select: {
        id: true,
        email: true,
        token: true,
        image: true,
        password: false,
      },
    });

    if (!user || !decodedToken)
      throw new GraphQLError("you must be logged in to query this schema", {
        extensions: {
          code: "UNAUTHENTICATED",
        },
      });

    const session: Session = {
      user: user as User,
    };

    return { session, prisma, pubsub };
  };
  app.use(express.json());

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: process.env.CLIENT_ORIGIN,
      credentials: true,
    }),
    json(),
    expressMiddleware(server, { context })
  );
  app.use("/auth", authRoutes);

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
}

main().then(() => {
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
});
