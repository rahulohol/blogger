import { Comment } from "../models/comment.js";
import mongoose from "mongoose";

// Controller functions

export const createComment = async (req, res) => {
  try {
    const {
      userId,
      blogId,
      mainParent,
      parent,
      commentText,
      creatorName,
      creatorImage,
      isCreatorVerified,
    } = req.body;

    const newComment = new Comment({
      creator: req.userId,
      blogId: blogId,
      mainParent: mainParent || null,
      parent: parent || null,
      createdAt: new Date().toISOString(),
      commentText,
      creatorName,
      creatorImage,
      isCreatorVerified,
    });

    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getComments = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const comments = await Comment.find({ blogId: blogId });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const replyToComment = async (req, res) => {
  try {
    const { userId, postId, parentCommentId, content } = req.body;

    const newComment = new Comment({
      user: userId,
      blogPost: postId,
      parentComment: parentCommentId,
      content,
    });

    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const editComment = async (req, res) => {
  try {
    const commentId = req.params.comment_id;
    const { commentText } = req.body; // Get the updated commentText from the request body

    if (!req.userId) {
      return res.json({ message: "User is not authenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res
        .status(404)
        .json({ message: `No comment exists with id: ${commentId}` });
    }

    const update = await Comment.findByIdAndUpdate(
      commentId,
      { commentText }, // Update only the commentText field
      { new: true } // Return the updated comment
    );

    res.status(200).json(update);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const deleteComment = async (req, res) => {
//   try {
//     const commentId = req.params.comment_id;
//     const { userId } = req;

//     const comment = await Comment.findById(commentId);

//     if (!comment || comment.creator.toString() !== userId) {
//       return res
//         .status(404)
//         .json({ message: "Comment not found or unauthorized." });
//     }

//     // Function to recursively delete comments and their children
//     async function deleteCommentAndChildren(commentId) {
//       const commentsToDelete = await Comment.find({
//         $or: [{ _id: commentId }, { mainParent: commentId }],
//       });
//       for (const commentToDelete of commentsToDelete) {
//         await commentToDelete.remove();
//         await deleteCommentAndChildren(commentToDelete._id);
//       }
//     }

//     await deleteCommentAndChildren(commentId);

//     res.status(204).json(); // No content
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.comment_id;
    const { userId } = req;

    // Check if the commentId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Invalid comment ID" });
    }

    // Find the comment by its ID
    const commentToDelete = await Comment.findById(commentId);

    if (!commentToDelete || !userId) {
      return res
        .status(404)
        .json({ message: "Comment not found or unauthorized." });
    }

    // Use the .deleteOne() method to remove the comment
    await Comment.deleteOne({ _id: commentId });
    await Comment.deleteMany({ mainParent: commentId });

    res.status(204).json(); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
