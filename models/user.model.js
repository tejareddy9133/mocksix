const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: String,
    avatar: String,
    email: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("users", UserSchema);
module.exports = { UserModel };
