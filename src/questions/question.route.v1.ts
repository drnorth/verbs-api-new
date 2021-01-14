import { IRouteStructure } from "types.common/route.types";
import { QuestionController } from "./question.controller";
import { QuestionValidator } from "./question.validation";

const Routes: IRouteStructure<
  typeof QuestionController,
  typeof QuestionValidator,
  QuestionValidator
> = {
  mainRoute: "/questions",
  controller: QuestionController,
  validator: QuestionValidator,
  subRoutes: [
    {
      method: "get",
      route: "/",
      action: "getQuestions",
      validate: "emptyValidation",
      auth: true,
      role: "getQuestions",
    },
    {
      method: "post",
      route: "/",
      action: "createQuestion",
      validate: "emptyValidation",
      auth: true,
      role: "manageQuestions",
    },
    {
      method: "get",
      route: "/:id",
      action: "getQuestion",
      validate: "emptyValidation",
      auth: true,
      role: "getQuestions",
    },
    {
      method: "put",
      route: "/:id",
      action: "updateQuestion",
      validate: "emptyValidation",
      auth: true,
      role: "manageQuestions",
    },
    {
      method: "delete",
      route: "/:id",
      action: "removeQuestion",
      validate: "emptyValidation",
      auth: true,
      role: "manageQuestions",
    },
  ],
};

export default Routes;
