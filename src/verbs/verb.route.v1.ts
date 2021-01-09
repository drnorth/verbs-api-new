import { IRouteStructure } from "types.common/route.types";
import { VerbController } from "./verb.controller";
import { VerbValidator } from "./verb.validation";

const Routes: IRouteStructure<
  typeof VerbController,
  typeof VerbValidator,
  VerbValidator
> = {
  mainRoute: "/verbs",
  controller: VerbController,
  validator: VerbValidator,
  subRoutes: [
    {
      method: "get",
      route: "/",
      action: "getAll",
      validate: "emptyValidation",
    },
    {
      method: "post",
      route: "/",
      action: "addVerb",
      validate: "emptyValidation",
    },
    {
      method: "get",
      route: "/init",
      action: "initial",
      validate: "emptyValidation",
    },
    {
      method: "get",
      route: "/:id",
      action: "findVerb",
      validate: "emptyValidation",
    },
    {
      method: "put",
      route: "/:id",
      action: "updateVerb",
      validate: "emptyValidation",
    },
    {
      method: "delete",
      route: "/:id",
      action: "deleteVerb",
      validate: "emptyValidation",
    },
  ],
};

export default Routes;
