import User, { IUser } from "@models/userModel";
import { createUser as createUserRepo } from "@repository/userRepository";

export const createUser = async (UserData: IUser) => {
  return await createUserRepo(UserData);
};
