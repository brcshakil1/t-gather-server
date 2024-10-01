import { model, Schema } from "mongoose";
import { IPostComments, IUpvoteDownVote } from "./post.constant";
import { IPost } from "./post.interface";

const upvoteDownVoteSchema = new Schema<IUpvoteDownVote>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const postCommentSchema = new Schema<IPostComments>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
});

const postSchema = new Schema<IPost>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }], // Array of image URLs
    category: {
      type: String,
      enum: [
        "Adventure",
        "Business Travel",
        "Exploration",
        "Leisure",
        "Cultural",
        "Eco-Tourism",
        "Religious Pilgrimage",
        "Luxury Travel",
        "Backpacking",
        "Wellness Travel",
        "Road Trips",
        "Family Vacation",
        "Honeymoon",
        "Wildlife Safari",
        "Culinary Travel",
        "Cruise Travel",
        "Historical Tourism",
        "Volunteer Travel",
        "Sports Tourism",
        "Solo Travel",
      ],
      required: true,
    },
    upvote: { type: [upvoteDownVoteSchema], default: [] }, // Array of upvotes and downvotes
    downvote: { type: [upvoteDownVoteSchema], default: [] }, // Array of upvotes and downvotes
    comments: { type: [postCommentSchema], default: [] }, // Array of comments
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Post = model<IPost>("Post", postSchema);

export default Post;
