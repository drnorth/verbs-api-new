import { LessonsController } from "./lessons.controller";
import { LessonValidator } from "./lesson.validation";

const Routes = {
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
      method: "post",
      route: "/:id/questions/result",
      action: "removeLesson",
      validate: "emptyValidation",
    },
    {
      method: "get",
      route: "/questions",
      action: "getQuestions",
      validate: "emptyValidation",
    },
    {
      method: "delete",
      route: "/questions/:id",
      action: "removeQuestion",
      validate: "emptyValidation",
    },

    {
      method: "get",
      route: "/:id",
      action: "getLesson",
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
