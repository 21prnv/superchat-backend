const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const postSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
