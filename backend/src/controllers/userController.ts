import { NextFunction, Request, Response } from "express";
import { createUser as createUserService } from "../services/userService";
import User from "@models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY as string;
if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined in environment variables.");
}

export const createUser = async (req: Request, res: Response) => {
  console.log("req.body", req.body);
  try {
    const { email } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ error: "User already exists" });
      return;
    }
    const user = await createUserService(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    console.log("email", email);
    console.log("password", password);
    const userExists = await User.findOne({ email });
    console.log("userExists", userExists);
    if (!userExists) {
      res.status(400).json({ error: "User not found" });
      return;
    }
    const isMatch = await bcrypt.compare(password, userExists.password);
    console.log("isMatch", isMatch);
    if (!isMatch) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }
    const token = jwt.sign({ userId: userExists._id }, SECRET_KEY, {
      expiresIn: "1 hour",
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
