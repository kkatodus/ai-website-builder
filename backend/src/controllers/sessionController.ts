import { RequestWithUser } from "@middlewares/authMiddleware";
import { ISession } from "@models/sessionModel";
import { IUser } from "@models/userModel";
import {
  getAllUserSessions as getAllUserSessionsService,
  createSession as createSessionService,
  updateSession as updateSessionService,
  deleteSession as deleteSessionService,
  getOneSession as getOneSessionService,
} from "@services/sessionServices";
import { RequestHandler, Response } from "express";

export const createSessions: RequestHandler = async (
  req: RequestWithUser,
  res: Response
) => {
  const userId = req.user?._id;
  if (!userId) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }
  try {
    const session: ISession = req.body;
    const createdSession = await createSessionService(session, userId as IUser);
    res.status(201).json(createdSession);
  } catch (error) {
    res.status(500).json({ message: "Failed to create session" });
  }
};

export const updateSession: RequestHandler = async (
  req: RequestWithUser,
  res: Response
) => {
  try {
    const session: ISession = req.body;
    const updated = await updateSessionService(session);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteSession: RequestHandler = async (
  req: RequestWithUser,
  res: Response
) => {
  try {
    const sessionId = req.params.id;
    await deleteSessionService(sessionId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUserSessions: RequestHandler = async (
  req: RequestWithUser,
  res: Response
) => {
  const userId = req.user?._id as string;
  if (!userId) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }
  try {
    const sessions = await getAllUserSessionsService(userId);
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOneSession: RequestHandler = async (
  req: RequestWithUser,
  res: Response
) => {
  const sessionId = req.params.id;
  const userId = req.user?._id as string;
  if (!userId) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }
  try {
    const session = await getOneSessionService(sessionId, userId.toString());
    if (!session) {
      res.status(404).json({ message: "Session not found" });
      return;
    }
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
