import express from "express";
const router = express.Router();
import multer from "multer";

import {
  signup,
  signin,
  // googleSignIn,
  getCreaterDetails,
  getAllUsers,
  getFollowers,
  getFollowing,
  followUserController,
  unfollowUserController,
} from "../controllers/user_controller.js";
import auth from "../middlewares/auth.js";

const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}. ${file.originalname}`);
  },
});

// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only images is allowd"));
  }
};

const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

router.post("/signup", upload.single("imageFile"), signup);
router.post("/signin", signin);
// router.post("/googleSignIn", googleSignIn);

router.get("/getcreaterdetails/:id", getCreaterDetails);

router.get("/:userId/followers", getFollowers);
router.get("/:userId/following", getFollowing);

// router.get("/getallusers", auth, getAllUsers);
// Add these routes to your user API
router.post("/follow/:userId", auth, followUserController);
router.post("/unfollow/:userId", auth, unfollowUserController);

export default router;
