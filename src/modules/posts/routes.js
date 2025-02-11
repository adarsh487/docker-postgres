import express from "express";
const router = express();
import postController from "./controller.js";
import { likeUnlikeValidation } from "./validations.js";

router.post("/create", postController.createPost);
router.get("/getAll", postController.getAll);
router.post("/like", likeUnlikeValidation, postController.likeUnlikePost);
export default router;
