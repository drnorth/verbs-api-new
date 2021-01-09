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
    },
    {
      method: "post",
      route: "/",
      action: "createLesson",
      validate: "emptyValidation",
    },
    {
      method: "get",
      route: "/init",
      action: "initialLeassons",
      validate: "emptyValidation",
    },
    {
      method: "get",
      route: "/:id/result",
      action: "setResult",
      validate: "emptyValidation",
    },
    {
      method: "get",
      route: "/:id",
      action: "getLesson",
      validate: "emptyValidation",
    },
    {
      method: "put",
      route: "/:id",
      action: "updateLesson",
      validate: "emptyValidation",
    },
    {
      method: "delete",
      route: "/:id",
      action: "removeLesson",
      validate: "emptyValidation",
    },
  ],
};

export default Routes;
