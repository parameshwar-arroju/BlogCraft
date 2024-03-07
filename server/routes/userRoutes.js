import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import cookieParser from "cookie-parser";
import { User } from "../models/db.js";
import { z } from "zod";
import 'dotenv/config';
import userAuth from "../middlewares/userAuth.js";

const jwtSecret = process.env.JWT_SECRET;
const userRoute = express.Router();

userRoute.use(cookieParser());

userRoute.post("/signup", async (req, res) => {
  const userSchema = z.object({
    fullname: z.string(),
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(8),
  });
  
  const validation = userSchema.safeParse(req.body);
  
  if (!validation.success) {
    return res.status(400).json({ message: "Invalid details" });
  }

  const userExist = await User.findOne({ username: req.body.username });
  
  if (userExist) {
    return res.status(409).json({ message: "User already exists" });
  }
  const hash = await bcrypt.hash(req.body.password, 13);
  req.body.password = hash;
  await User.create(req.body);
  res.status(201).json({ message: "User created successfully" });
});

userRoute.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Username or Password is Incorrect" });
  }
  const match = await bcrypt.compare(password, user.password);
  if(!match) return res.status(401).json({message: "Username or Password is Incorrect"});

  const token = jwt.sign({ username }, jwtSecret);
  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ token, username });
});

userRoute.post("/signout", userAuth, (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User signout successful" });
});

userRoute.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

userRoute.all('*', (req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

export default userRoute;