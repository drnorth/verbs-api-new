import { Router } from "express";
import userRouter from "user/user.route.v1";
import verbRouter from "verbs/verb.route.v1";
import lessonRouter from "lessons/lessons.route.v1";

const router = Router();

router.use("/user", userRouter);
router.use("/verbs", verbRouter);
router.use("/lessons", lessonRouter);

export default router;
