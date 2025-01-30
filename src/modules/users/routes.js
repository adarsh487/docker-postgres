import express from "express";
const router = express();
import userController from "./controller.js";
import { registerValidation } from "./validations.js";

router.post("/register", registerValidation, userController.registerUser);
router.get("/getAll", userController.getAllUsers);
router.get("/get", userController.getUserById);
router.post("/chat", userController.chat);

export default router;
