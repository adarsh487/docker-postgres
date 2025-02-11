import express from "express";
const router = express();
import quizController from "./controller.js";
import { createQuestionValidation } from "./validations.js";

router.post("/create", createQuestionValidation, quizController.createQuestion);
router.get("/getAll", quizController.getAll);
export default router;
