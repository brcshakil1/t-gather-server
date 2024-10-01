import { IPost } from "./post.interface";
import Post from "./post.model";

const createPostIntoDB = async (payload: IPost) => {
  const result = await Post.create(payload);

  if (!result) {
    throw new Error(
      "Something went wrong while creating the post. Please try again."
    );
  }
  const postData = await Post.findById(result?._id).populate("user");

  return postData;
};

export const PostServices = { createPostIntoDB };
