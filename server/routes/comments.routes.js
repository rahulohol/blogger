import express from "express";
// import CommentModel from "../models/comment.js";

import {
  createComment,
  deleteComment,
  editComment,
  getComments,
} from "../controllers/comments_controller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Logic to retrieve comments for a blog post by postId
// Return comments for the specified post as JSON
router.get("/comments/:blogId", getComments);

router.use(auth);

// Logic to create a new comment
// Parse request data and create a new comment
// Return the newly created comment as JSON
router.post("/create", createComment);

// router.post("/api/comments/reply", async (req, res) => {
//   try {
//     // Logic to reply to an existing comment
//     // Parse request data and create a reply
//     // Return the newly created reply as JSON
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.put("/edit/:comment_id", editComment);

router.delete("/delete/:comment_id", deleteComment);

export default router;
