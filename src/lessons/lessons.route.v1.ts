import { Router } from "express";
import { LessonsController } from "./lessons.controller";

const router = Router();

router
  .route("/")
  .get(LessonsController.getAllLessons)
  .post(LessonsController.createLesson);

router.route("/init").get(LessonsController.initialLeassons);

router.route("/:id/questions/result").post(LessonsController.setResult);

router.route("/questions").get(LessonsController.getQuestions);

router.route("/questions/:id").delete(LessonsController.removeQuestion);

router
  .route("/:id")
  .get(LessonsController.getLesson)
  .delete(LessonsController.removeLesson);

export default router;
