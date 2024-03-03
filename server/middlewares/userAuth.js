import jwt from "jsonwebtoken";
import { User } from "../models/db.js";
import "dotenv/config";

const jwtSecrect = process.env.JWT_SECRET;

async function userAuth(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  const verify = jwt.verify(token, jwtSecrect);
  if (!verify) res.status(401).json({ message: "User doesn't exist" });
  else {
    req.username = verify.username;
    next();
  }
}

export default userAuth;
