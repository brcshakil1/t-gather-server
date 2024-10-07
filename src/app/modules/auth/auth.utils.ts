import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "./../user/user.interface";

export const createToken = (
  jwtPayload: Partial<IUser>,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
