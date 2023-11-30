const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    avatar: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
