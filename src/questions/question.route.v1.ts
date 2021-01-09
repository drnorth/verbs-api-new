import { QuestionController } from "./question.controller";
import { QuestionValidator } from "./question.validation";

const Routes = {
  mainRoute: "/questions",
  controller: QuestionController,
  validator: QuestionValidator,
  subRoutes: [
    {
      method: "get",
      route: "/",
      action: "getQuestions",
      validate: "emptyValidation",
    },
    {
      method: "post",
      route: "/",
      action: "createQuestion",
      validate: "emptyValidation",
    },
    {
      method: "get",
      route: "/:id",
      action: "getQuestion",
      validate: "emptyValidation",
    },
    {
      method: "put",
      route: "/:id",
      action: "updateQuestion",
      validate: "emptyValidation",
    },
    {
      method: "delete",
      route: "/:id",
      action: "removeQuestion",
      validate: "emptyValidation",
    },
  ],
};

export default Routes;
