export const Query = {
    // USER
    users: async (_, __, { _db }) => await _db.User.find(),
    user: async (_, { id }, { _db }) => await _db.User.findById(id),
  
    // EVENT
    events: async (_, __, { _db }) => await _db.Event.find(),
    event: async (_, { id }, { _db }) => await _db.Event.findById(id),
  
    // LOCATİON
    locations: async (_, __, { _db }) => await _db.Location.find(),
    location: async (_, { id }, { _db }) => await _db.Location.findById(id),
  
    // PARTİCİPANT
    participants: async (_, __, { _db }) => await _db.Participant.find(),
    participant: async (_, { id }, { _db }) => await _db.Participant.findById(id),
  };