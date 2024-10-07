import { model, Schema } from "mongoose";
import {
  IUser,
  IUserFollowers,
  IUserFollowings,
  IUserModel,
} from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

// Mongoose Schema for IUserFollowers
const UserFollowersSchema = new Schema<IUserFollowers>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Mongoose Schema for IUserFollowings
const UserFollowingsSchema = new Schema<IUserFollowings>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Mongoose Schema for IUser
const UserSchema = new Schema<IUser, IUserModel>(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], required: true },
    image: { type: String },
    dateOfBirth: { type: String, required: true },
    address: { type: String },
    followers: { type: [UserFollowersSchema], default: [] },
    followings: { type: [UserFollowingsSchema], default: [] },
    isPremium: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

// plain password to hash password

UserSchema.pre("save", async function (next) {
  const user = this;
  console.log(user, "pre user");
  this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));
  next();
});

// check if the user exist by id
UserSchema.statics.isUserExistById = async function (userId) {
  return await User.findById(userId).select("password");
};

// hash password
UserSchema.statics.hashPassword = async function (plainPassword) {
  return await bcrypt.hash(plainPassword, Number(config.salt_rounds));
};

// this is for match is plain password match with hash password

UserSchema.statics.isPasswordMatch = async function (
  plainPassword,
  hashPassword
) {
  return await bcrypt.compare(plainPassword, hashPassword);
};

export const User = model<IUser, IUserModel>("User", UserSchema);
