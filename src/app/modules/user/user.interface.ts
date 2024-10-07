import { Model, ObjectId } from "mongoose";

interface IUserName {
  firstName: string;
  lastName?: string;
}

interface IUserAddress {
  area?: string;
  postOffice?: string;
  postCode?: number;
  district?: string;
}

export interface IUserFollowers {
  user: ObjectId;
}
export interface IUserFollowings {
  user: ObjectId;
}

export interface IUser {
  username: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  image: string;
  dateOfBirth: string;
  address?: string;
  followers: IUserFollowers[];
  followings: IUserFollowings[];
  isPremium: boolean;
  isDeleted: boolean;
}

export interface IUserModel extends Model<IUser> {
  hashPassword(plainPassword: string): Promise<string>;
  isUserExistById(id: string): Promise<IUser>;
  isPasswordMatch(
    plainPassword: string,
    hashPassword: string
  ): Promise<boolean>;
}
