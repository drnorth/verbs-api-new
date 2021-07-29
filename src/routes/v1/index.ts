import { Router } from "express";
import catchAsync from "utils/catchAsync";
import languageRouter from "languages/language.route.v1";
import userRouter from "user/user.route.v1";
import verbRouter from "verbs/verb.route.v1";
import lessonRouter from "lessons/lesson.route.v1";
import authRouter from "auth/auth.route.v1";
import questionRouter from "questions/question.route.v1";
import statisticRouter from "statistic/statistic.route.v1";
import simulatorRouter from "simulators/simulator.route.v1";
import validate from "middlewares/validate";
import { auth } from "middlewares/auth";

const router = Router();

const allRoutes = [];

allRoutes.push(
  languageRouter,
  userRouter,
  verbRouter,
  lessonRouter,
  authRouter,
  questionRouter,
  statisticRouter,
  simulatorRouter
);

allRoutes.forEach((route) => {
  router.use(
    route.mainRoute,
    (route.subRoutes as any).reduce((acc: Router, subRoute: any) => {
      (acc.route(subRoute.route) as any)[subRoute.method](
        (new route.validator() as any)[subRoute.validate](),
        validate,
        subRoute.auth ? auth(subRoute.role) : [],
        catchAsync((route.controller as any)[subRoute.action])
      );
      return acc;
    }, Router())
  );
});

export default router;
