const { ApolloServer, gql } = require('apollo-server');
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');

const { events, locations, users, participants } = require('./data.json');

const typeDefs = gql`
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

  type User {
    id: ID!
    username: String!
    email: String!
    events: [Event!]!
  }

  type Participant {
    id: ID!
    user_id: ID!
    event_id: ID!
    user: User!
    event: Event!
  }

  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
});

server.listen().then(({ url }) => {
  console.log(`Server is ready at ${url}`);
});