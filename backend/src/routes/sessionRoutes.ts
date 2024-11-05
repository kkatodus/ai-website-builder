import {
  createSessions,
  updateSession,
  deleteSession,
  getAllUserSessions,
  getOneSession,
} from "@controllers/sessionController";
import express from "express";
import { authenticate } from "@middlewares/authMiddleware";

const router = express.Router();

router.post("/create", authenticate, createSessions);
router.put("/update/:id", authenticate, updateSession);
router.delete("/delete/:id", authenticate, deleteSession);
router.get("/get", authenticate, getAllUserSessions);
router.get("/get/:id", authenticate, getOneSession);

export default router;
