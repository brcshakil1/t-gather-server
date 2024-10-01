import { ObjectId } from "mongoose";

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
  role: "ADMIN" | "USER";
  image: string;
  dateOfBirth: string;
  address?: string;
  followers: IUserFollowers[];
  followings: IUserFollowings[];
}
