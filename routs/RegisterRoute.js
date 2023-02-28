// const { json } = require("body-parser");
const express = require("express");

const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const jwt = require("jsonwebtoken");

//
require("dotenv").config();
//
const bcrypt = require("bcrypt");
const User = require("../module/User");
const Post = require("../module/Post");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB max file size
});

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { description } = req.body;
    console.log(req.body);
    const newPost = new Post({
      description,
      image: req.file.filename,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/posts/:postId", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    if (!deletedPost) {
      return res.status(404).send({ error: "Post not found" });
    }
    res.send({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.post("/signup", (req, res) => {
  console.log(req.body);
  const { name, email, number, password, cpassword } = req.body;
  if (!name || !email || !number || !password || !cpassword) {
    console.log("All Fields Are Required");
    return res.status(422).json({ error: "All Fields Are Required" });
  }
  User.findOne({ email: email }).then(async (savedUser) => {
    if (savedUser) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }

    const user = new User({
      name,
      email,
      number,
      password,
      cpassword,
    });

    try {
      await user.save();
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.send({ token });
    } catch (err) {
      console.log(err);
    }
  });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add email or password" });
  }
  const savedUser = await User.findOne({ email: email });

  if (!savedUser) {
    return res.status(422).json({ error: "Invalid Credentials" });
  }

  try {
    bcrypt.compare(password, savedUser.password, (err, result) => {
      if (result) {
        console.log("Password matched");
        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
        res.send({ token });
      } else {
        console.log("Password does not match");
        return res.status(422).json({ error: "Invalid Credentials" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
