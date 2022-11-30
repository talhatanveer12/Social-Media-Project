const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  message: {
    type: String,
  },
  profilePic: {
    type: String,
  },
});

const postSchema = new mongoose.Schema({
  decs: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  comments: {
    type: [commentSchema],
  },
  likes: {
    type: Map,
    of: Boolean,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Post = mongoose.model("Post", postSchema);

exports.Post = Post;
