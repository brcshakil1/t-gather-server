import config from "../../config";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";

const loginUser = async (payload: ILoginUser) => {
  // check if user is exist
  const user = await User.findOne({
    email: payload?.email,
  });

  if (!user) {
    throw new Error(`Your email or password is not match. Please try again.`);
  } else {
    const isPasswordMatch = await User.isPasswordMatch(
      payload?.password as string,
      user?.password
    );

    if (!isPasswordMatch) {
      throw new Error("Password not matched.");
    }

    const jwtPayload = {
      _id: user?._id,
      email: user?.email,
      role: user?.role || "USER",
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expiresIn as string
    );
    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expiresIn as string
    );

    return { accessToken, refreshToken };
  }
};

const refreshToken = async (token: string) => {
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { email } = decoded;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found.");
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expiresIn as string
  );

  return { accessToken };
};

// const registerUser = async (userData: ILoginUser) => {
//   const user = await User.create({ ...userData, role: USER_ROLE.user });
//   return user;
// };

export const AuthServices = {
  loginUser,
  refreshToken,
  // register,
};
