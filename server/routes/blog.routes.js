import express from "express";
import multer from "multer";
const router = express.Router();
import auth from "../middlewares/auth.js";
import BlogModal from "../models/blog.js";
import cloudinary from "../helper/cloudinaryconfig.js";

import {
  createBlog,
  deleteBlog,
  getRelatedBlogs,
  getBlog,
  getBlogs,
  getBlogsBySearch,
  getBlogsByUser,
  getBlogsByTag,
  likeBlog,
  updateBlog,
} from "../controllers/blog_controller.js";

router.get("/search", getBlogsBySearch);
router.get("/tag/:tag", getBlogsByTag);
router.post("/relatedBlogs", getRelatedBlogs);
router.get("/getblogs", getBlogs);
router.get("/blog/:id", getBlog);

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

router.post("/create", upload.single("imageFile"), auth, async (req, res) => {
  const blog = req.body;
  // if (req.file) {
  // const { filename } = req.file;
  // }
  const upload = await cloudinary.uploader.upload(req.file.path);

  const newBlog = new BlogModal({
    ...blog,
    creator: req.userId,
    imgpath: upload.secure_url,

    // imgpath: filename,
    createdAt: new Date().toISOString(),
  });

  try {
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.put(
  "/update/:id",
  upload.single("imageFile"),
  auth,
  async (req, res) => {
    const { id } = req.params;
    const updatedBlogData = req.body;

    try {
      let updatedBlog = { ...updatedBlogData };

      if (req.file) {
        // const { filename } = req.file;

        const upload = await cloudinary.uploader.upload(req.file.path);

        updatedBlog.imgpath = upload.secure_url;
      }

      let existingBlog = await BlogModal.findById(id);
      if (!existingBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      for (let key in updatedBlog) {
        existingBlog[key] = updatedBlog[key];
      }

      console.log(existingBlog);

      const update = await BlogModal.findByIdAndUpdate(id, existingBlog, {});

      await update.save();

      res.status(200).json(update);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.delete("/delete/:id", auth, deleteBlog);

router.get("/userblogs/:id", getBlogsByUser);

router.patch("/like/:id", auth, likeBlog);

export default router;
