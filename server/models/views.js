import mongoose from "mongoose";

const viewSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to your User model
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blog", // Reference to your Blog model
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

const View = mongoose.model("View", viewSchema);

export default View;
