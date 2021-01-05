import { Router } from "express";
import userRouter from "user/user.route.v1";

const router = Router();

router.use("/user", userRouter);

export default router;
