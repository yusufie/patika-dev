const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = Schema({
  email: {
    type: String,
    trim: true,
    require: true,
  },
  password: {
    type: String,
    trim: true,
    require: true,
  },
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  } else next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
