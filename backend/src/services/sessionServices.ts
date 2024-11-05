import { ISession } from "@models/sessionModel";
import { IUser } from "@models/userModel";
import {
  createSession as createSessionRepository,
  updateSession as updateSessionRepository,
  deleteSession as deleteSessionRepository,
  getAllUserSessions as getAllUserSessionsRepository,
  getSessionById,
} from "@repository/sessionRepository";

export const createSession = async (Session: ISession, userId: IUser) => {
  const session = await createSessionRepository(Session, userId);
  return session;
};

export const updateSession = (Session: ISession) => {
  const session = updateSessionRepository(Session);
  return session;
};

export const deleteSession = (sessionId: string) => {
  const session = deleteSessionRepository(sessionId);
  return session;
};

export const getAllUserSessions = (user: string) => {
  const sessions = getAllUserSessionsRepository(user);
  return sessions;
};

export const getOneSession = (sessionId: string, userId: string) => {
  const sessions = getSessionById(sessionId, userId);
  return sessions;
};
