import { Router } from "express";
import userRouter from "user/user.route.v1";
import verbRouter from "verbs/verb.route.v1";

const router = Router();

router.use("/user", userRouter);
router.use("/verbs", verbRouter);

export default router;
