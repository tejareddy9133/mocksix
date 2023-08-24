const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  id: Number,
  username: String,
  title: String,
  content: String,
  category: String,
  date: Date,
  likes: Number,
  comments: [
    {
      username: String,
      content: String,
    },
  ],
});
const BlogModel = mongoose.model("blogs", postSchema);

module.exports = { BlogModel };
