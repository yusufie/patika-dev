import { withFilter } from "graphql-subscriptions";

export const Subscription = {
  userCreated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("userCreated"),
  },
  eventCreated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("eventCreated"),
  },
  participantAdded: {
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator("participantAdded"),
      (payload, variables) => {
        return variables.event_id
          ? payload.participantAdded.event_id == variables.event_id
          : true;
      }
    ),
  },
};