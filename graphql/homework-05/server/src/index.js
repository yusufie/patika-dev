import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import express from "express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import { PubSub } from "graphql-subscriptions";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

// Models
import Event from "./models/Event";
import User from "./models/User";
import Location from "./models/Location";
import Participant from "./models/Participant";

// Fake data
import data from "./data.json";

import db from "./db";
db();

const app = express();
const httpServer = createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const pubsub = new PubSub();

const server = new ApolloServer({
  schema,
  context: { pubsub, db: data, _db: { Event, User, Location, Participant } },
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageGraphQLPlayground({}),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          },
        };
      },
    },
  ],
});

const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
    async onConnect() {
      console.log("Connected!");
      return { pubsub, db };
    },
    onDisconnect() {
      console.log("Disconnected!");
    },
  },
  {
    server: httpServer,
    path: server.graphqlPath,
  }
);

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startApolloServer();