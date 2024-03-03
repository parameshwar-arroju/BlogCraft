import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { User } from "../models/db.js";
import { z } from "zod";
import 'dotenv/config';
import userAuth from "../middlewares/userAuth.js";

const jwtSecrect = process.env.JWT_SECRET;
const userRoute = express.Router();

userRoute.use(cookieParser());

userRoute.post("/signup",async (req, res) => {
	const userschema = z.object({
		fullname: z.string(),
		email: z.string().email(),
		username: z.string(),
		password: z.string().min(8),
	});
	const validation = userschema.safeParse(req.body);
	if (!validation.success) res.status(404).json({ message: "Invalid details" });
	else {
		const userExist = await User.findOne({ username: req.body.username });
		if (userExist) res.status(404).json({ message: "User already exits" });
		else {
			await User.create(req.body);
			res.status(201).json({ message: "User created sucessfully" });
		}
	}
});

userRoute.post("/signin",async (req, res) => {
  const userInfo = req.body;
  const valid = await User.findOne(userInfo);
  if(!valid)  res.status(404).json({message: "Username or Password is Incorrect"}); 
  else{
	const token = jwt.sign({username: req.body.username}, jwtSecrect);
	res.status(201).json({token: token});
  }
});

userRoute.post("/signout", userAuth, (req, res) => {
	res.cookie("token", '').status(200).json({message: "User signout sucessfull"});
});

userRoute.use((err, req, res, next) => {
	res.status(500).json({error: err});
	next();
})

userRoute.all('*', (req, res) => {
	res.status(404).json({message: "Route Not Found"});
});

export default userRoute;
