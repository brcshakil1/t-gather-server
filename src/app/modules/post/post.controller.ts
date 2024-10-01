import { Request, Response } from "express";
import { PostServices } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const post = req.body;
    const result = await PostServices.createPostIntoDB(post);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Posted successfully!",
      data: result,
    });
  } catch (err: any) {
    const errMessage = err.message || "An unexpected error occurred";
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: errMessage,
    });
  }
};

const PostControllers = {
  createPost,
};

export default PostControllers;
