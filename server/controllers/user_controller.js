import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_TOKEN;
// const secret = "test";
// console.log("secret", secret);

export const signup = async (req, res) => {
  const { filename } = req.file;
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
      imgpath: filename,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "8h",
    });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "8h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const googleSignIn = async (req, res) => {
  const { email, name, token, googleId } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser) {
      const result = { _id: oldUser._id.toString(), email, name };
      return res.status(200).json({ result, token });
    }

    const result = await UserModal.create({
      email,
      name,
      googleId,
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const getCreaterDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const CreaterDetails = await UserModal.findById({ _id: id });
    res.status(200).json(CreaterDetails);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModal.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const followUserController = async (req, res) => {
  try {
    const userIdToFollow = req.params.userId;
    const currentUser = req.body;
    const currentUserId = req.userId;

    console.log(req.body);

    if (!currentUser || !userIdToFollow) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    // Check if the current user is already following the user
    // if (currentUser.following.includes(userIdToFollow)) {
    //   return res
    //     .status(400)
    //     .json({ message: "You are already following this user" });
    // }
    const userToFollow = await UserModal.findById(userIdToFollow);

    // Add the user to the current user's following list
    const saveFollow = {};
    saveFollow._id = userToFollow?._id;
    saveFollow.name = userToFollow?.name;

    saveFollow.imgpath = userToFollow?.imgpath;

    const userFollowing = await UserModal.findById(currentUserId);
    userFollowing.following.push(saveFollow);
    await userFollowing.save();

    // Add the current user to the userToFollow's followers list
    const saveFollowing = {};
    saveFollowing._id = userFollowing?._id;
    saveFollowing.name = userFollowing?.name;

    saveFollowing.imgpath = userFollowing?.imgpath;

    // let checkFollow = false;

    // if (userToFollow.followers) {
    //   for (let i = 0; i < userToFollow.followers.length; i++) {
    //     let obj = userToFollow.followers[i];
    //     for (let key in obj) {
    //       if (obj[key].toString() === currentUserId) {
    //         checkFollow = true;
    //       }
    //     }
    //   }
    // }

    userToFollow.followers.push(saveFollowing);

    let followersCount = userToFollow.followers.length;
    await userToFollow.save();

    // Return the updated user data for the current user

    res.json({ saveFollowing, followersCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const unfollowUserController = async (req, res) => {
  try {
    const userIdToUnfollow = req.params.userId;
    const currentUser = req.userId;

    console.log("current", currentUser);

    if (!currentUser || !userIdToUnfollow) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    // const userToUnfollow = await UserModal.findById(userIdToUnfollow);

    //  if (followers) {
    //    for (let i = 0; i < userToUnfollow.followers.length; i++) {
    //      let obj = followers[i];
    //      for (let key in obj) {
    //        if (obj[key] === user?.result?._id) {
    //          followUnFollowcheck = true;
    //        }
    //      }
    //    }
    //  }
    // Check if the current user is following the user
    // if (!currentUser.following.includes(userIdToUnfollow)) {
    //   return res
    //     .status(400)
    //     .json({ message: "You are not following this user" });
    // }

    const updateFollowing = await UserModal.findById(currentUser);

    updateFollowing.following = updateFollowing.following.filter(
      (item) => item._id.toString() !== userIdToUnfollow
    );

    // Remove the user from the current user's following list

    await updateFollowing.save();

    // Remove the current user from the userToUnfollow's followers list
    const userToUnfollow = await UserModal.findById(userIdToUnfollow);

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (item) => item._id.toString() !== currentUser
    );

    let followersCount = userToUnfollow.followers.length;

    await userToUnfollow.save();

    // Return the updated user data for the current user
    res.json({ currentUser, followersCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getFollowers = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModal.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const followers = user.followers;

    res.json(followers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getFollowing = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModal.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const following = user.following;

    res.json(following);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
