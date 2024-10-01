import { ObjectId } from "mongoose";

export type TTravelCategory =
  | "Adventure"
  | "Business Travel"
  | "Exploration"
  | "Leisure"
  | "Cultural"
  | "Eco-Tourism"
  | "Religious Pilgrimage"
  | "Luxury Travel"
  | "Backpacking"
  | "Wellness Travel"
  | "Road Trips"
  | "Family Vacation"
  | "Honeymoon"
  | "Wildlife Safari"
  | "Culinary Travel"
  | "Cruise Travel"
  | "Historical Tourism"
  | "Volunteer Travel"
  | "Sports Tourism"
  | "Solo Travel";

export interface IUpvoteDownVote {
  user: ObjectId;
}

export interface IPostComments {
  user: ObjectId;
  comment: string;
}

const travelCategories = [
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
];
