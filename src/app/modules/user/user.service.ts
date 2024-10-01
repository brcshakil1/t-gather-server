import { IUser } from "./user.interface";
import { User } from "./user.model";

const createSingleUserIntoDB = async (payload: IUser) => {
  // check if the email is already exist
  const email = payload?.email;
  const username = payload?.username;
  const findUserByEmail = await User.findOne({ email: email });
  const findUserByUsername = await User.findOne({ username: username });

  if (findUserByEmail) {
    throw new Error(
      `Email ${findUserByEmail.email} already exists. Please enter a new email.`
    );
  }
  if (findUserByUsername) {
    throw new Error(
      `Username ${findUserByUsername.username} already exists. Please enter a new username.`
    );
  }

  const result = await User.create(payload);
  return result;
};

const getUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const userFollowersUpdatesIntoDB = async (payload) => {};

export const UserServices = {
  createSingleUserIntoDB,
  getUsersFromDB,
};
