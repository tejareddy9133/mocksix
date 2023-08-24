const express = require("express");
const { BlogModel } = require("../models/blogs.model");
const { auth } = require("../middleware/authmiddleware");
const blogRouter = express.Router();

blogRouter.post("/create", auth, async (req, res) => {
  try {
    const newPost = new BlogModel({
      id: req.body.id,
      username: req.body.username,
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      date: req.body.date,
      likes: req.body.likes,
      comments: req.body.comments,
    });

    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

blogRouter.get("/blogs", auth, async (req, res) => {
  try {
    // const userPosts = await BlogModel.find({ username: req.body.username });
    const { category, sort, order } = req.query;
    const query = { username: req.body.username };
    if (category) {
      query.category = category;
    }
    const setOrder = {};
    if (sort) {
      setOrder[sort] = order === "asc" ? 1 : -1;
    }

    const userPosts = await BlogModel.find(query).sort(setOrder);
    res.status(200).json({ Blogs: userPosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = {
  blogRouter,
};

blogRouter.get("/", auth, async (req, res) => {
  try {
    const { category, sort, order } = req.query;
    const query = { userID: req.userID };

    if (category) {
      query.category = category;
    }

    const setOrder = {};
    if (sort) {
      setOrder[sort] = order === "asc" ? 1 : -1;
    }

    const blogs = await blogModel.find(query).sort(setOrder);
    res.status(200).json({ Blogs: blogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
