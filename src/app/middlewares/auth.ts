import config from "../config";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth = () => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("Unauthorized user.");
    }
    const decoded = jwt.verify(
      token as string,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { email, role, iat } = decoded;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Unauthorized user.");
    }

    // decoded undefined
    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
