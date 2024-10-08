import { Request, Response } from "express";
import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";

const createSingleUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await UserServices.createSingleUserIntoDB(user);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User registered successfully.",
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

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getUsersFromDB();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User retrieved successfully.",
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

const addFollower = async (req: Request, res: Response) => {
  try {
    const { targetedUserId } = req.params;

    const { userId } = req.body;

    const result = await UserServices.addFollowerIntoUserDB(
      userId,
      targetedUserId
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "You are successfully following!",
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

const changingPassword = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const changingPassword = req.body;
  const result = await UserServices.changePassword(userId, changingPassword);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Password changed!",
    data: result,
  });
});

const updateUserInformation = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.updateUserInformationIntoDB(
    userId,
    req.body
  );

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User info updated!",
    data: result,
  });
});

export const UserControllers = {
  createSingleUser,
  getUsers,
  addFollower,
  changingPassword,
  updateUserInformation,
};
