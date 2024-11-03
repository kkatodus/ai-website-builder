import User, { IUser, UserSchema } from "@models/userModel";
import bcrypt from "bcrypt";

export const findUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const createUser = async (userData: IUser) => {
  try {
    // const hashedPassword = await bcrypt.hash(userData.password, 10);
    // userData.password = hashedPassword;
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error as string);
  }
};
