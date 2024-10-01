import { model, Schema } from "mongoose";
import { IUser, IUserFollowers, IUserFollowings } from "./user.interface";

// Mongoose Schema for IUserFollowers
const UserFollowersSchema = new Schema<IUserFollowers>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Mongoose Schema for IUserFollowings
const UserFollowingsSchema = new Schema<IUserFollowings>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Mongoose Schema for IUser
const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "USER"], required: true },
    image: { type: String },
    dateOfBirth: { type: String, required: true },
    address: { type: String },
    followers: { type: [UserFollowersSchema], default: [] },
    followings: { type: [UserFollowingsSchema], default: [] },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);
