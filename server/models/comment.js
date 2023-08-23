// models.mjs

import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define Comment schema and model
const commentSchema = new Schema({
  creator: { type: String },
  blogId: { type: String },
  mainParent: { type: String, default: null },
  parent: { type: String, default: null },
  commentText: String,
  creatorName: String,
  createdAt: String,
  creatorImage: String,
  isCreatorVerified: Boolean,
  // Add other comment properties as needed
});

export const Comment = model("comments", commentSchema);
