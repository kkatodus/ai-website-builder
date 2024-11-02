import express from "express";
import chatController from "@controllers/chatController";

const router = express.Router();

router.post("/gpt-completion", chatController);

export default router;
