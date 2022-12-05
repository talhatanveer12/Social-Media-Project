const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const followUser = new mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  Bio: {
    type: String,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  profilePic: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  followers: {
    type: [followUser],
  },
  followings: {
    type: [followUser],
  },
  Bio: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.PRIVATEKEY
  );
  return token;
};

const User = mongoose.model("User", userSchema);

exports.User = User;
