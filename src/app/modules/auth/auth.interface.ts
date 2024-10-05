import { ObjectId } from "mongoose";

export interface ILoginUser {
  username?: string;
  email: string;
  password?: string;
}
