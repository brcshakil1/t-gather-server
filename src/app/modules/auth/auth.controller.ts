import { Request, Response } from "express";
import { AuthServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthServices.loginUser(req.body);
    const { accessToken, refreshToken } = result;

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User is logged in successfully!",
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (err: any) {
    // Check if it's a custom error with a message, otherwise use a generic error
    const errorMessage = err.message || "An unexpected error occurred.";

    res.status(400).json({
      success: false,
      statusCode: 400,
      message: errorMessage,
    });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Access token is retrieved successfully!",
      data: result,
    });
  } catch (err: any) {
    // Check if it's a custom error with a message, otherwise use a generic error
    const errorMessage = err.message || "An unexpected error occurred.";

    res.status(400).json({
      success: false,
      statusCode: 400,
      message: errorMessage,
    });
  }
};

// const registerUser = async (req: Request, res: Response) => {
//   try {
//     const result = await AuthServices.loginUser(req.body);

//     res.status(200).json({
//       success: false,
//       statusCode: 400,
//       message: "User registered successfully",
//       data: result,
//     });
//   } catch (err: any) {
//     // Check if it's a custom error with a message, otherwise use a generic error
//     const errorMessage = err.message || "An unexpected error occurred.";

//     res.status(400).json({
//       success: false,
//       statusCode: 400,
//       message: errorMessage,
//     });
//   }
// };

export const AuthControllers = {
  loginUser,
  refreshToken,
  // registerUser,
};
