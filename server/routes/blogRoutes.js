import express from "express";
import multer from "multer";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
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

blogRoute.use(cookieParser());

// Home route
blogRoute.get("/all", async (req, res) => {
  const BlogList = await Blog.find({});
  res.status(201).json({ BlogList: BlogList });
});

blogRoute.get("/myblogs", userAuth, async (req, res) => {
  const username = req.username;
  const BlogList = await Blog.find({ author: username });
  res.status(201).json({ BlogList: BlogList });
});

blogRoute.get("/:blogid", userAuth, async (req, res) => {
  const blogid = req.params.blogid;
  const BlogList = await Blog.find({ _id: blogid });
  res.status(201).json({ BlogList: BlogList });
});

blogRoute.post("/newblog", userAuth, upload.single("img"), async (req, res) => {
  const blogInfo = req.body;
  blogInfo.img = {
    filename: req.file.filename,
    path: req.file.path,
  };
  blogInfo.author = req.username;
  await Blog.create(blogInfo);
  res.status(201).json({ message: "Blog created sucessfully" });
});

blogRoute.patch("/:blogid", userAuth, upload.single("img"), async (req, res) => {
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
      { new: true }
    );
    if (!currentBlog) res.status(400).json({ message: "Cannot accecss it" });
    else res.status(201).json({ message: "Blog Updated sucessfully" });
  }
);

blogRoute.delete("/:blogid", userAuth, async (req, res) => {
  const blogid = req.params.blogid;
  const currentBlog = await Blog.findOneAndDelete({
    _id: blogid,
    author: req.username,
  });
  if (!currentBlog) res.status(400).json({ message: "Cannot accecss it" });
  else res.status(200).json({ message: "Blog deleted sucessfully" });
});

blogRoute.use((err, req, res, next) => {
	res.status(500).json({error: err});
	next();
})

blogRoute.all("*", (req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

export default blogRoute;
