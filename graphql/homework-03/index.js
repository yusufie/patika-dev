const { createServer } = require('http');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');

const { nanoid } = require('nanoid');
const { events, locations, users, participants } = require('./data.json');
const pubsub = require('./pubsub');

const PORT = 4000;

const typeDefs = gql`
  #User
  type User {
    id: ID!
    username: String!
    email: String!
    events: [Event!]!
  }

  input CreateUserInput {
    username: String!
    email: String!
  }

  input UpdateUserInput {
    username: String
    email: String
  }

  #Event
  type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
    user: User!
    location: Location!
    participants: [Participant!]!
  }

  input CreateEventInput {
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
  }

  input UpdateEventInput {
    title: String
    desc: String
    date: String
    from: String
    to: String
    location_id: ID
    user_id: ID
  }

  #Participant
  type Participant {
    id: ID!
    user_id: ID!
    event_id: ID!
    user: User!
    event: Event!
  }

  input CreateParticipantInput {
    user_id: ID!
    event_id: ID!
  }

  input UpdateParticipantInput {
    user_id: ID
    event_id: ID
  }

  #Location
  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  input CreateLocationInput {
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  input UpdateLocationInput {
    name: String
    desc: String
    lat: Float
    lng: Float
  }

  type DeleteAllOutput {
    count: Int!
  }

  type Query {
    #event
    events: [Event!]!
    event(id: ID!): Event!

    #user
    users: [User!]!
    user(id: ID!): User!

    #participants
    participants: [Participant!]!
    participant(id: ID!): Participant!

    #locations
    locations: [Location!]!
    location(id: ID!): Location!
  }

  type Mutation {
    #user
    createUser(data: CreateUserInput!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
    deleteAllUsers: DeleteAllOutput!

    #event
    createEvent(data: CreateEventInput!): Event!
    updateEvent(id: ID!, data: UpdateEventInput!): Event!
    deleteEvent(id: ID!): Event!
    deleteAllEvents: DeleteAllOutput!

    #participant
    createParticipant(data: CreateParticipantInput!): Participant!
    updateParticipant(id: ID!, data: UpdateParticipantInput!): Participant!
    deleteParticipant(id: ID!): Participant!
    deleteAllParticipants: DeleteAllOutput!

    #location
    createLocation(data: CreateLocationInput!): Location!
    updateLocation(id: ID!, data: UpdateLocationInput!): Location!
    deleteLocation(id: ID!): Location!
    deleteAllLocations: DeleteAllOutput!
  }

  type Subscription {
    #user subs
    userCreated: User!
    userUpdated: User!
    userDeleted: User!

    #event
    eventCreated: Event!
    eventUpdated: Event!
    eventDeleted: Event!
    eventCount: Int!

    #participant
    participantCreated: Participant!
    participantUpdated: Participant!
    participantDeleted: Participant!
    partipantCount: Int!

    #
    locationCreated: Location!
    locationUpdated: Location!
    locationDeleted: Location!
    locationCount: Int!
  }
`;

const resolvers = {
  Query: {
    // events
    events: () => events,
    event: (parent, args) => {
      const event = events.find((event) => event.id === parseInt(args.id));
      if (!event) {
        return new Error('Event not found!');
      } else {
        return event;
      }
    },

    // users
    users: () => users,
    user: (parent, args) => {
      const user = users.find((user) => user.id === parseInt(args.id));
      if (!user) {
        return new Error('User not found!');
      } else {
        return user;
      }
    },

    //participants
    participants: () => participants,
    participant: (parent, args) => {
      const participant = participants.find(
        (participant) => participant.id === parseInt(args.id)
      );
      if (!participant) {
        return new Error('Participant not found!');
      } else {
        return participant;
      }
    },

    //locations
    locations: () => locations,
    location: (parent, args) => {
      const location = locations.find(
        (location) => location.id === parseInt(args.id)
      );
      if (!location) {
        return new Error('Location not found!');
      } else {
        return location;
      }
    },
  },

  User: {
    events: (parent) =>
      events.filter((event) => event.user_id === parseInt(parent.id)),
  },

  Event: {
    user: (parent) =>
      users.find((user) => user.id === parseInt(parent.user_id)),
    location: (parent) =>
      locations.find(
        (location) => location.id === parseInt(parent.location_id)
      ),
    participants: (parent) =>
      participants.filter((participant) => participant.event_id === parent.id),
  },

  Participant: {
    user: (parent) => users.find((user) => user.id == parent.user_id),
    event: (parent) => events.find((event) => event.id == parent.event_id),
  },

  Mutation: {
    //User
    createUser: (parent, { data }) => {
      const user = { id: nanoid(), ...data };
      users.push(user);
      pubsub.publish('userCreated', { userCreated: user });
      return user;
    },
    updateUser: (parent, { id, data }) => {
      const user_index = users.findIndex((user) => user.id === parseInt(id));

      if (user_index === -1) {
        return new Error('User not found!');
      }

      const updatedUser = (users[user_index] = {
        ...users[user_index],
        ...data,
      });
      pubsub.publish('userUpdated', { userUpdated: updatedUser });
      return updatedUser;
    },
    deleteUser: (parent, { id }) => {
      const user_index = users.findIndex((user) => user.id === parseInt(id));

      if (user_index === -1) {
        return new Error('User not found!');
      }

      const deletedUser = users[user_index];
      users.splice(user_index, 1);
      pubsub.publish('userDeleted', { userDeleted: deletedUser });
      return deletedUser;
    },
    deleteAllUsers: () => {
      const lenght = users.length;
      users.splice(0, lenght);

      return {
        count: lenght,
      };
    },

    //event
    createEvent: (parent, { data }) => {
      const event = { id: nanoid(), ...data };
      events.push(event);
      pubsub.publish('eventCreated', { eventCreated: event });
      return event;
    },
    updateEvent: (parent, { id, data }) => {
      const event_index = events.findIndex(
        (event) => event.id === parseInt(id)
      );

      if (event_index === -1) {
        return new Error('Event not found!');
      }

      const updatedEvent = (events[event_index] = {
        ...events[event_index],
        ...data,
      });
      pubsub.publish('eventUpdated', { eventUpdated: updatedEvent });
      return updatedEvent;
    },
    deleteEvent: (parent, { id }) => {
      const event_index = events.findIndex(
        (event) => event.id === parseInt(id)
      );

      if (event_index === -1) {
        return new Error('Event not found!');
      }

      const deletedEvent = events[event_index];
      events.splice(event_index, 1);
      pubsub.publish('eventDeleted', { eventDeleted: deletedEvent });
      return deletedEvent;
    },
    deleteAllEvents: () => {
      const lenght = events.length;
      events.splice(0, lenght);

      return {
        count: lenght,
      };
    },

    //participant
    createParticipant: (parent, { data }) => {
      const participant = { id: nanoid(), ...data };
      participants.push(participant);
      return participant;
    },
    updateParticipant: (parent, { id, data }) => {
      const participant_index = participants.findIndex(
        (participant) => participant.id === parseInt(id)
      );

      if (participant_index === -1) {
        return new Error('Participant not found!');
      }

      const updatedParticipant = (participants[[participant_index]] = {
        ...participants[participant_index],
        ...data,
      });

      return updatedParticipant;
    },
    deleteParticipant: (parent, { id }) => {
      const participant_index = participants.findIndex(
        (participant) => participant.id === parseInt(id)
      );

      if (participant_index === -1) {
        return new Error('Participant not found!');
      }

      const deletedParticipant = participants[participant_index];
      participants.splice(participant_index, 1);

      return deletedParticipant;
    },
    deleteAllParticipants: () => {
      const lenght = participants.length;
      participants.splice(0, lenght);

      return {
        count: lenght,
      };
    },

    //location
    createLocation: (parant, { data }) => {
      const location = { id: nanoid(), ...data };
      locations.push(location);
      return location;
    },
    updateLocation: (parent, { id, data }) => {
      const location_index = locations.findIndex(
        (location) => location.id === parseInt(id)
      );

      if (location_index === -1) {
        return new Error('Location not found!');
      }

      const updatedLocation = (locations[[location_index]] = {
        ...locations[location_index],
        ...data,
      });

      return updatedLocation;
    },
    deleteLocation: (parent, { id }) => {
      const location_index = locations.findIndex(
        (location) => location.id === parseInt(id)
      );

      if (location_index === -1) {
        return new Error('Location not found!');
      }

      const deletedLocation = locations[location_index];
      locations.splice(location_index, 1);

      return deletedLocation;
    },
    deleteAllLocations: () => {
      const lenght = locations.length;
      locations.splice(0, lenght);

      return {
        count: lenght,
      };
    },
  },

  Subscription: {
    //user
    userCreated: {
      subscribe: () => pubsub.asyncIterator('userCreated'),
    },
    userUpdated: {
      subscribe: () => pubsub.asyncIterator('userUpdated'),
    },
    userDeleted: {
      subscribe: () => pubsub.asyncIterator('userDeleted'),
    },

    //event
    eventCreated: {
      subscribe: () => pubsub.asyncIterator('eventCreated'),
    },
    eventUpdated: {
      subscribe: () => pubsub.asyncIterator('eventUpdated'),
    },
    eventDeleted: {
      subscribe: () => pubsub.asyncIterator('eventDeleted'),
    },
  },
};

async function startApolloServer() {
  // Create schema, which will be used separately by ApolloServer and
  // the WebSocket server.
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Create an Express app and HTTP server; we will attach the WebSocket
  // server and the ApolloServer to this HTTP server.
  const app = express();
  const httpServer = createServer(app);

  // Set up WebSocket server.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });
  const serverCleanup = useServer({ schema }, wsServer);

  // Set up ApolloServer.
  const server = new ApolloServer({
    schema,
    context: {
      pubsub,
    },
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
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
  server.applyMiddleware({ app });

  // Now that our HTTP server is fully set up, actually listen.
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startApolloServer();