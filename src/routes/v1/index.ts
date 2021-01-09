import { Router } from "express";
import catchAsync from "utils/catchAsync";
import userRouter from "user/user.route.v1";
import verbRouter from "verbs/verb.route.v1";
import lessonRouter from "lessons/lessons.route.v1";
import authRouter from "auth/auth.route.v1";
import validate from "middlewares/validate";

const router = Router();

const allRoutes = [];

allRoutes.push(userRouter, verbRouter, lessonRouter, authRouter);

allRoutes.forEach((route) => {
  router.use(
    route.mainRoute,
    route.subRoutes.reduce((acc: any, subRoute) => {
      acc
        .route(subRoute.route)
        [subRoute.method](
          (new route.validator() as any)[subRoute.validate](),
          validate,
          catchAsync((route.controller as any)[subRoute.action])
        );
      return acc;
    }, Router())
  );
});

export default router;
