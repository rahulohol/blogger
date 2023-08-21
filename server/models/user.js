import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  googleId: { type: String, required: false },
  id: { type: String },
  isVerified: { type: Boolean, default: false },
  bio: {
    type: String,
    default:
      "Passionate writer and avid reader, sharing my thoughts and stories with the world through words. Exploring diverse topics and perspectives one blog post at a time. 📚✍️",
  },
  imgpath: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  followers: {
    type: [],
    default: [],
  },
  following: {
    type: [],
    default: [],
  },
});

const UserModal = mongoose.model("User", userSchema);

export default UserModal;
