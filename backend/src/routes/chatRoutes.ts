import express from "express";
import chatController from "@controllers/chatController";
import { authenticate } from "@middlewares/authMiddleware";

const router = express.Router();

router.post("/gpt-completion", authenticate, chatController);

export default router;
