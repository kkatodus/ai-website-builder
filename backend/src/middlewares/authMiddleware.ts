import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import User, { IUser } from "@models/userModel";

const SECRET_KEY = process.env.SECRET_KEY as string;

export interface RequestWithUser extends Request {
  user?: IUser;
}

export const authenticate = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const user = await User.findById((decodedToken as any).userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
