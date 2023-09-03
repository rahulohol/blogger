import express from "express";
const router = express.Router();
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../models/user.js";
// import dotenv from "dotenv";

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
    callback(null, `image-${Date.now()}.${file.originalname}`);
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

router.post("/signup", upload.single("imageFile"), async (req, res) => {
  // const { filename } = req.file;

  const upload = await cloudinary.uploader.upload(req.file.path);

  const { email, password, firstName, lastName } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      imgpath: upload.secure_url,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "8h",
    });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
});

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
