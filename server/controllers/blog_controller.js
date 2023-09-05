import BlogModal from "../models/blog.js";
import View from "../models/views.js";
import mongoose from "mongoose";
import cloudinary from "../helper/cloudinaryconfig.js";

export const createBlog = async (req, res) => {
  const blog = req.body;
  // if (req.file) {
  const { filename } = req.file;
  // }

  const newBlog = new BlogModal({
    ...blog,
    creator: req.userId,
    imgpath: filename,
    createdAt: new Date().toISOString(),
  });

  try {
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const updatedBlogData = req.body;

  try {
    let updatedBlog = { ...updatedBlogData };

    if (req.file) {
      const { filename } = req.file;
      updatedBlog.imgpath = filename;
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
};

// export const getBlogs = async (req, res) => {
//   const { page } = req.query;
//   try {
//     // const blogs = await BlogModal.find();
//     // res.status(200).json(blogs);

//     const limit = 6;
//     const startIndex = (Number(page) - 1) * limit;
//     const total = await BlogModal.countDocuments({});
//     const blogs = await BlogModal.find().limit(limit).skip(startIndex);
//     res.json({
//       data: blogs,
//       currentPage: Number(page),
//       totalBlogs: total,
//       numberOfPages: Math.ceil(total / limit),
//     });
//   } catch (error) {
//     res.status(404).json({ message: "Something went wrong" });
//   }
// };

export const getBlogs = async (req, res) => {
  const { page } = req.query;
  try {
    const limit = 6;
    const startIndex = (Number(page) - 1) * limit;
    const total = await BlogModal.countDocuments({});
    const blogs = await BlogModal.find()
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (recent first)
      .limit(limit)
      .skip(startIndex);

    res.json({
      data: blogs,
      currentPage: Number(page),
      totalBlogs: total,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

// export const getBlog = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const blog = await BlogModal.findById(id);
//     res.status(200).json(blog);
//   } catch (error) {
//     res.status(404).json({ message: "Something went wrong" });
//   }
// };

export const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BlogModal.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Get the user's ID from the request (assuming you have user authentication)
    const userId = req.userId;
    console.log(userId);
    if (userId) {
      // Check if the user has already viewed this blog
      const existingView = await View.findOne({ userId, blogId: id });

      if (!existingView) {
        // If the user has not viewed this blog before, record the view
        await View.create({ userId, blogId: id });
      }
    }

    // Increment the total view count for the blog
    blog.views += 1;

    // Save the updated blog object
    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBlogsByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const userBlogs = await BlogModal.find({ creator: id });
  res.status(200).json(userBlogs);
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No blog exist with id: ${id}` });
    }
    await BlogModal.findByIdAndRemove(id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getBlogsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    // const blogs = await BlogModal.find({ title });

    const blogs = await BlogModal.find({
      $or: [{ title }, { category: title }],
    });

    // ( { $or: [ { price:10.99 }, { "carrier.state": "NY"} ] }
    res.json(blogs);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getBlogsByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const blogs = await BlogModal.find({ tags: { $in: tag } });
    res.json(blogs);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getRelatedBlogs = async (req, res) => {
  const tags = req.body;
  try {
    const blogs = await BlogModal.find({ tags: { $in: tags } });
    res.json(blogs);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const likeBlog = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.userId) {
      return res.json({ message: "User is not authenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No blog exist with id: ${id}` });
    }

    const blog = await BlogModal.findById(id);

    const index = blog.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      blog.likes.push(req.userId);
    } else {
      blog.likes = blog.likes.filter((id) => id !== String(req.userId));
    }

    const updatedBlog = await BlogModal.findByIdAndUpdate(id, blog, {
      new: true,
    });

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// import BlogModal from "../models/blog.js";
// import mongoose from "mongoose";

// export const createBlog = async (req, res) => {
//   try {
//     const { body, file, userId } = req;
//     const { filename } = file;

//     const newBlog = await BlogModal.create({
//       ...body,
//       creator: userId,
//       imgpath: filename,
//       createdAt: new Date().toISOString(),
//     });

//     res.status(201).json(newBlog);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// export const updateBlog = async (req, res) => {
//   const { id } = req.params;
//   const updatedBlogData = req.body;

//   try {
//     const updatedBlog = { ...updatedBlogData };

//     if (req.file) {
//       const { filename } = req.file;
//       updatedBlog.imgpath = filename;
//     }

//     const existingBlog = await BlogModal.findById(id);
//     if (!existingBlog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }

//     Object.assign(existingBlog, updatedBlog);
//     const updatedBlogDoc = await existingBlog.save();

//     res.status(200).json(updatedBlogDoc);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// export const getBlogs = async (req, res) => {
//   const { page } = req.query;
//   const limit = 6;
//   const startIndex = (Number(page) - 1) * limit;

//   try {
//     const total = await BlogModal.countDocuments({});
//     const blogs = await BlogModal.find()
//       .sort({ createdAt: -1 })
//       .limit(limit)
//       .skip(startIndex);

//     res.json({
//       data: blogs,
//       currentPage: Number(page),
//       totalBlogs: total,
//       numberOfPages: Math.ceil(total / limit),
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// export const getBlog = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const blog = await BlogModal.findById(id);
//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }
//     res.status(200).json(blog);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// export const getBlogsByUser = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ message: "User doesn't exist" });
//   }
//   try {
//     const userBlogs = await BlogModal.find({ creator: id });
//     res.status(200).json(userBlogs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// export const deleteBlog = async (req, res) => {
//   const { id } = req.params;
//   try {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).json({ message: `No blog exists with id: ${id}` });
//     }
//     await BlogModal.findByIdAndRemove(id);
//     res.json({ message: "Blog deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// export const getBlogsBySearch = async (req, res) => {
//   const { searchQuery } = req.query;
//   try {
//     const title = new RegExp(searchQuery, "i");
//     const blogs = await BlogModal.find({
//       $or: [{ title }, { category: title }],
//     });
//     res.json(blogs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// export const getBlogsByTag = async (req, res) => {
//   const { tag } = req.params;
//   try {
//     const blogs = await BlogModal.find({ tags: { $in: [tag] } });
//     res.json(blogs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// export const getRelatedBlogs = async (req, res) => {
//   const { tags } = req.body;
//   try {
//     const blogs = await BlogModal.find({ tags: { $in: tags } });
//     res.json(blogs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// export const likeBlog = async (req, res) => {
//   const { id } = req.params;
//   try {
//     if (!req.userId) {
//       return res.status(401).json({ message: "User is not authenticated" });
//     }

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).json({ message: `No blog exists with id: ${id}` });
//     }

//     const blog = await BlogModal.findById(id);

//     const index = blog.likes.indexOf(req.userId);

//     if (index === -1) {
//       blog.likes.push(req.userId);
//     } else {
//       blog.likes.splice(index, 1);
//     }

//     const updatedBlog = await BlogModal.findByIdAndUpdate(id, blog, {
//       new: true,
//     });

//     res.status(200).json(updatedBlog);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };
