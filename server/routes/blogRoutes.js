import express from "express";
import fs from "fs";
import multer from "multer";
import jwt from "jsonwebtoken";
import { Blog } from "../models/db.js";
import userAuth from "../middlewares/userAuth.js";

const blogRoute = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 100);
    const fileInfo = uniqueSuffix + "-" + file.originalname;
    cb(null, fileInfo);
  },
});
const upload = multer({ storage: storage });

// Home route
blogRoute.get("/all", async (req, res) => {
  try {
    const BlogList = await Blog.find({}).sort({ date: "desc" });
    res.status(200).json({ BlogList: BlogList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

blogRoute.get("/myblogs", userAuth, async (req, res) => {
  try {
    const username = req.username;
    const BlogList = await Blog.find({ author: username }).sort({
      date: "desc",
    });
    res.status(200).json({ BlogList: BlogList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

blogRoute.get("/:blogid", userAuth, async (req, res) => {
  try {
    const blogid = req.params.blogid;
    const BlogList = await Blog.find({ _id: blogid });
    res.status(200).json({ BlogList: BlogList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

blogRoute.post(
  "/newblog",
  userAuth,
  upload.single("file"),
  async (req, res) => {
    try {
      const blogInfo = req.body;
      blogInfo.img = {
        filename: req.file.filename,
        path: req.file.path,
      };
      blogInfo.author = req.username;
      await Blog.create(blogInfo);
      res.status(201).json({ message: "Blog created successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

blogRoute.patch(
  "/:blogid",
  userAuth,
  upload.single("file"),
  async (req, res) => {
    try {
      const blogid = req.params.blogid;
      const currentBlog = await Blog.findOneAndUpdate(
        {
          _id: blogid,
          author: req.username,
        },
        {
          $set: {
            _id: blogid,
            img: {
              filename: req.file.filename || currentBlog.img.filename,
              path: req.file.path || currentBlog.img.path,
            },
            title: req.body.title || currentBlog.title,
            description: req.body.description || currentBlog.description,
            content: req.body.content || currentBlog.content,
          },
        },
        { new: false }
      );
      if (!currentBlog) {
        res.status(400).json({ message: "Cannot access it" });
      } else {
        try {
          fs.copyFileSync(req.file.path, currentBlog.img.path);
          fs.unlinkSync(currentBlog.img.path);
          res.status(200).json({ message: "Blog Updated successfully" });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error" });
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

blogRoute.delete("/:blogid", userAuth, async (req, res) => {
  try {
    const blogid = req.params.blogid;
    const currentBlog = await Blog.findOneAndDelete({
      _id: blogid,
      author: req.username,
    });
    if (!currentBlog) {
      res.status(400).json({ message: "Cannot access it" });
    } else {
      try {
        fs.unlinkSync(currentBlog.img.path);
        res.status(200).json({ message: "Blog deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default blogRoute;
