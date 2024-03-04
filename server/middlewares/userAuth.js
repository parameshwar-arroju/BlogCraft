import jwt from "jsonwebtoken";
import { User } from "../models/db.js";
import "dotenv/config";

const jwtSecret = process.env.JWT_SECRET;

async function userAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, jwtSecret);
    
    if (!verify) {
      throw new Error("User doesn't exist");
    } else {
      req.username = verify.username;
      next();
    }
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ message: err.message });
  }
}

export default userAuth;
