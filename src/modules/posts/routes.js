import express from "express";
const router = express();
import postController from "./controller.js";
// import { registerVa/lidation } from "./validations.js";

router.post("/create", postController.createPost);
// router.get("/getAll", postController.getAllUsers);
// router.get("/get", postController.getUserById);

export default router;
