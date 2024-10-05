import { ObjectId } from "mongoose";
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

export const UserServices = {
  createSingleUserIntoDB,
  getUsersFromDB,
  addFollowerIntoUserDB,
  removeFollowerIntoUserDB,
};
