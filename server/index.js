import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import Connection from "./database/db.js";

import userRouter from "./routes/auth.routes.js";
import blogRouter from "./routes/blog.routes.js";
import CommentRouter from "./routes/comments.routes.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter);
app.use("/blog", blogRouter);
app.use("/comment", CommentRouter);

app.use("/uploads", express.static("./uploads"));

const PORT = process.env.PORT || 5000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT -> ${PORT}`)
);
