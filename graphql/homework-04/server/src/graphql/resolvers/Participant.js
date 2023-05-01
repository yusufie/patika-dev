export const Participant = {
    user: async (parent, __, { _db }) => await _db.User.findById(parent.user),
    event: async (parent, __, { _db }) => await _db.Event.findById(parent.event)
  };