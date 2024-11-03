import { createUser, loginUser } from "@controllers/userController";
import { IUser } from "@models/userModel";
import express, { Request, Response } from "express";
import { authenticate } from "src/middlewares/authMiddleware";

const router = express.Router();

interface RequestWithUser extends Request {
  user?: IUser;
}

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/profile", authenticate, (req: RequestWithUser, res: Response) => {
  res.json(req.user);
});

export default router;
