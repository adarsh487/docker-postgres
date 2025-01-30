import express from "express";
import userRouter from "./modules/users/routes.js";
import postRouter from "./modules/posts/routes.js";
const router = express();

router.use("/users", userRouter);
router.use("/posts", postRouter);
export default router;
