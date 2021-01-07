import { Router } from "express";
import userRouter from "user/user.route.v1";
import verbRouter from "verbs/verb.route.v1";
import lessonRouter from "lessons/lessons.route.v1";

const router = Router();

const allRoutes = [];

allRoutes.push(userRouter, verbRouter, lessonRouter);

allRoutes.forEach((route) => {
  router.use(
    route.mainRoute,
    route.subRoutes.reduce((acc: any, subRoute) => {
      acc
        .route(subRoute.route)
        [subRoute.method]((route.controller as any)[subRoute.action]);
      return acc;
    }, Router())
  );
});

export default router;
