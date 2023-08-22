import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  creator: String,
  category: String,
  creatorImage: String,
  isVerified: Boolean,
  tags: [String],
  imgpath: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
});

const BlogModal = mongoose.model("blog", blogSchema);

export default BlogModal;
