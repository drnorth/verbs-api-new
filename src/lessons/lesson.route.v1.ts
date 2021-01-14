import { LessonsController } from "./lesson.controller";
import { LessonValidator } from "./lesson.validation";
import { IRouteStructure } from "types.common/route.types";

const Routes: IRouteStructure<
  typeof LessonsController,
  typeof LessonValidator,
  LessonValidator
> = {
  mainRoute: "/lessons",
  controller: LessonsController,
  validator: LessonValidator,
  subRoutes: [
    {
      method: "get",
      route: "/",
      action: "getAllLessons",
      validate: "emptyValidation",
      auth: true,
      role: "getLessons",
    },
    {
      method: "post",
      route: "/",
      action: "createLesson",
      validate: "emptyValidation",
      auth: true,
      role: "manageLessons",
    },
    {
      method: "get",
      route: "/init",
      action: "initialLeassons",
      validate: "emptyValidation",
      auth: true,
      role: "data",
    },
    {
      method: "get",
      route: "/:id/result",
      action: "setResult",
      validate: "emptyValidation",
      auth: true,
      role: "getTest",
    },
    {
      method: "get",
      route: "/:id",
      action: "getLesson",
      validate: "emptyValidation",
      auth: true,
      role: "getLessons",
    },
    {
      method: "put",
      route: "/:id",
      action: "updateLesson",
      validate: "emptyValidation",
      auth: true,
      role: "manageLessons",
    },
    {
      method: "delete",
      route: "/:id",
      action: "removeLesson",
      validate: "emptyValidation",
      auth: true,
      role: "manageLessons",
    },
  ],
};

export default Routes;
