import { ObjectId } from "mongoose";
import {
  IPostComments,
  IUpvoteDownVote,
  TTravelCategory,
} from "./post.constant";

export interface IPost {
  user: ObjectId;
  title: string;
  description: string;
  images: string[];
  category: TTravelCategory;
  upvote: IUpvoteDownVote[];
  downvote: IUpvoteDownVote[];
  comments: IPostComments[];
}
