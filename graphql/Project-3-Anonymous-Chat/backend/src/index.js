const { ApolloServer, gql } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const express = require('express');
const { createServer } = require('http');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const { v4: uuidv4 } = require('uuid');

const messages = [];

const app = express();
const httpServer = createServer(app);

const typeDefs = gql`
  type Message {
    id: ID!
    message: String!
    user: String!
  }

  input createMessage {
    message: String!
    user: String!
  }

  type Query {
    messages: [Message!]!
  }

  type Mutation {
    createMessage(data: createMessage!): Message!
  }

  type Subscription {
    messageCreated: Message!
  }
`;

const resolvers = {
  Query: {
    messages: () => messages,
  },

  Mutation: {
    createMessage: (_, { data }, { pubsub }) => {
      const message = {
        id: uuidv4(),
        ...data,
      };
      messages.unshift(message);
      pubsub.publish('messageCreated', { messageCreated: message });
      return message;
    },
  },

  Subscription: {
    messageCreated: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('messageCreated'),
    },
  },
};

const pubsub = require('./pubsub');

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  context: { pubsub },
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
      console.log('Connected!');
      return {
        pubsub,
      };
    },
    onDisconnect() {
      console.log('Disconnected!');
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
  httpServer.listen(process.env.PORT || PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();