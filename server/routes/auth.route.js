import express from "express";
const router = express.Router();

import { signup, signin } from "../controllers/user_controller.js";

router.post("/signup", signup);
router.post("/signin", signin);
// router.post("/googleSignIn", googleSignIn);

export default router;
