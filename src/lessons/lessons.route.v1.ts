import { LessonsController } from "./lessons.controller";

const Routes = {
  mainRoute: "/lessons",
  controller: LessonsController,
  subRoutes: [
    {
      method: "get",
      route: "/",
      action: "getAllLessons",
    },
    {
      method: "post",
      route: "/",
      action: "createLesson",
    },
    {
      method: "get",
      route: "/init",
      action: "initialLeassons",
    },
    {
      method: "post",
      route: "/:id/questions/result",
      action: "removeLesson",
    },
    {
      method: "get",
      route: "/questions",
      action: "getQuestions",
    },
    {
      method: "delete",
      route: "/questions/:id",
      action: "removeQuestion",
    },

    {
      method: "get",
      route: "/:id",
      action: "getLesson",
    },
    {
      method: "delete",
      route: "/:id",
      action: "removeLesson",
    },
  ],
};

export default Routes;
