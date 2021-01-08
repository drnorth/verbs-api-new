import { Router } from "express";
import { QuestionController } from "./question.controller";

const router = Router();

router
  .route("/")
  .get(QuestionController.getQuestions)
  .post(QuestionController.createQuestion);

router
  .route("/:id")
  .get(QuestionController.getQuestion)
  .put(QuestionController.updateQuestion)
  .delete(QuestionController.removeQuestion);

export default router;
