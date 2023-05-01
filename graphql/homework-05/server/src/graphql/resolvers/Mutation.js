import { v4 as uuidv4 } from "uuid";

export const Mutation = {
  // USER
  createdUser: (_, { data }, { pubsub, db }) => {
    const newUser = { id: uuidv4(), ...data };
    db.users.push(newUser);
    pubsub.publish("userCreated", { userCreated: newUser });
    return newUser;
  },
  updateUser: (_, { id, data }, { db }) => {
    const userIndex = db.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error("User not found.");
    }
    const updateUser = (db.users[userIndex] = {
      ...db.users[userIndex],
      ...data,
    });
    return updateUser;
  },
  deletedUser: (_, { id }, { db }) => {
    const userIndex = db.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error("User not found.");
    }
    const deletedUser = db.users[userIndex];
    db.users.splice(userIndex, 1);
    return deletedUser;
  },
  deletedAllUser: (_, __, { db }) => {
    const userLength = db.users.length;
    db.users.splice(0, userLength);
    return {
      count: userLength,
    };
  },

  // EVENT
  createdEvent: (_, { data }, { pubsub, db }) => {
    const newEvent = { id: uuidv4(), ...data };
    db.events.push(newEvent);
    pubsub.publish("eventCreated", { eventCreated: newEvent });
    return newEvent;
  },
  updatedEvent: (_, { id, data }, { db }) => {
    const eventIndex = db.events.findIndex((event) => event.id === id);
    if (eventIndex === -1) {
      throw new Error("Event not found.");
    }
    const updateEvent = (db.events[eventIndex] = {
      ...db.events[eventIndex],
      ...data,
    });
    return updateEvent;
  },
  deletedEvent: (_, { id }, { db }) => {
    const eventIndex = db.events.findIndex((event) => event.id === id);
    if (eventIndex === -1) {
      throw new Error("Event not found.");
    }
    const deletedEvent = db.events[eventIndex];
    db.events.splice(eventIndex, 1);
    return deletedEvent;
  },
  deletedAllEvent: (_, __, { db }) => {
    const eventLength = db.events.length;
    db.events.splice(0, eventLength);
    return {
      count: eventLength,
    };
  },

  // LOCATİON
  createdLocation: (_, { data }, { db }) => {
    const newLocation = { id: uuidv4(), ...data };
    db.locations.push(newLocation);
    return newLocation;
  },
  updatedLocation: (_, { id, data }, { db }) => {
    const locationIndex = db.locations.findIndex(
      (location) => location.id === id
    );

    if (locationIndex === -1) {
      throw new Error("Location not found.");
    }

    const updateLocation = (db.locations[locationIndex] = {
      ...db.locations[locationIndex],
      ...data,
    });

    return updateLocation;
  },
  deletedLocation: (_, { id }, { db }) => {
    const locationIndex = db.locations.findIndex(
      (location) => location.id === id
    );

    if (locationIndex === -1) {
      throw new Error("Location not found");
    }

    const deletedLocation = db.locations[locationIndex];
    db.locations.splice(locationIndex, 1);

    return deletedLocation;
  },
  deletedAllLocation: (_, __, { db }) => {
    const locationLength = db.locations.length;
    db.locations.splice(0, locationLength);
    return {
      count: locationLength,
    };
  },

  // PARTİCİPANT
  createdParticipant: (_, { data }, { pubsub, db }) => {
    const newParticipant = { id: uuidv4(), ...data };
    db.participants.push(newParticipant);
    pubsub.publish("participantAdded", { participantAdded: newParticipant });
    return newParticipant;
  },
  updatedParticipant: (_, { id, data }, { db }) => {
    const participantIndex = db.participants.findIndex(
      (participant) => participant.id === id
    );
    if (participantIndex === -1) {
      throw new Error("Participant not found.");
    }
    const updateParticipant = (db.participants[participantIndex] = {
      ...db.participants[participantIndex],
      ...data,
    });
    return updateParticipant;
  },
  deletedParticipant: (_, { id }, { db }) => {
    const participantIndex = db.participants.findIndex(
      (participant) => participant.id === id
    );
    if (participantIndex === -1) {
      throw new Error("Participant not found.");
    }
    const deletedParticipant = db.participants[participantIndex];
    db.participants.splice(participantIndex, 1);
    return deletedParticipant;
  },
  deletedAllParticipant: (_, __, { db }) => {
    const participantLength = db.participants.length;
    db.participants.splice(0, participantLength);
    return {
      count: participantLength,
    };
  },
};