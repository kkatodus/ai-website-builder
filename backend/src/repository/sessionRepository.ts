import sessionModel, { ISession } from "@models/sessionModel";
import { IUser } from "@models/userModel";

export const createSession = async (Session: ISession, userId: IUser) => {
  try {
    const session = await sessionModel.create({ ...Session, user: userId });
    return session;
  } catch (e) {
    console.log(e);
  }
};

export const updateSession = (Session: ISession) => {
  const session = sessionModel.findByIdAndUpdate(Session._id, Session, {
    new: true,
  });
  return session;
};

export const deleteSession = (sessionId: string) => {
  const session = sessionModel.findByIdAndDelete(sessionId);
  return session;
};

export const getAllUserSessions = (user: string) => {
  const sessions = sessionModel.find({ user: user });
  return sessions;
};

export const getSessionById = async (sessionId: string, userId: string) => {
  const session = await sessionModel.findById(sessionId);

  console.log(
    "retrieved session",
    session?.user._id.toString(),
    userId.toString()
  );

  if (!session || session.user._id.toString() !== userId) {
    throw new Error("Unauthorized");
  }
  return session;
};
