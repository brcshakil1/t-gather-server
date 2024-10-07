import { ObjectId } from "mongoose";
import { IUser } from "./user.interface";
import { User } from "./user.model";

interface IChangingPassword {
  currentPassword: string;
  newPassword: string;
  retypeNewPassword: string;
}

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

// update user information
const updateUserInformationIntoDB = async (
  userId: string,
  payload: Partial<IUser>
) => {
  // check if the user exist
  const user = await User.isUserExistById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const result = await User.findByIdAndUpdate(
    userId,
    { ...payload },
    { new: true }
  );

  return result;
};

const addFollowerIntoUserDB = async (
  userId: string,
  targetedUserId: string
) => {
  // check if user already following the targeted user
  const isUserFollowingTheTargetedUser = await User.findOne({
    _id: userId,
    "followings.user": targetedUserId,
  });

  if (isUserFollowingTheTargetedUser) {
    throw new Error("You'r already following the user.");
  }

  console.log({ userId }, { targetedUserId });

  // add targeted the current user's follower
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: { followings: targetedUserId },
    },
    { new: true }
  );

  const targetedUser = await User.findByIdAndUpdate(
    targetedUserId,
    {
      $addToSet: {
        followers: userId,
      },
    },
    { new: true }
  );

  return { user, targetedUser };
};

const removeFollowerIntoUserDB = async (
  userId: string,
  followerId: ObjectId
) => {
  const isUserAlreadyFollowed = await User.findOne({
    _id: userId,
    "followers.user": followerId,
  });

  // if user already followed the unfollowed
  if (isUserAlreadyFollowed) {
    const updatedUserFollowers = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { followers: { user: followerId } },
      },
      { new: true, useFindAndModify: false }
    );

    return;
  }
};

const changePassword = async (
  userId: string,
  changingPassword: IChangingPassword
) => {
  // checking if the user exists
  const isUserExist = await User.isUserExistById(userId);

  if (!isUserExist) {
    throw new Error("Unauthorized user");
  }

  const currentPassword = changingPassword.currentPassword;
  const newPassword = changingPassword.newPassword;
  const retypeNewPassword = changingPassword.retypeNewPassword;

  // check if the password match
  const isCurrentPasswordMatch = await User.isPasswordMatch(
    currentPassword,
    isUserExist?.password
  );

  if (!isCurrentPasswordMatch) {
    throw new Error(
      "Current password does not match. Please enter the correct password."
    );
  }

  if (newPassword === "" || retypeNewPassword === "") {
    throw new Error("Enter password");
  }

  // checking if the new password and retype newPassword matched
  if (newPassword !== retypeNewPassword) {
    throw new Error(
      "Please enter correct new password in the both new password and retype new password field. "
    );
  }

  const hashPassword = await User.hashPassword(newPassword);

  // update new password
  const result = await User.findByIdAndUpdate(userId, {
    password: hashPassword,
  });

  return result;
};

export const UserServices = {
  createSingleUserIntoDB,
  getUsersFromDB,
  addFollowerIntoUserDB,
  removeFollowerIntoUserDB,
  changePassword,
  updateUserInformationIntoDB,
};
