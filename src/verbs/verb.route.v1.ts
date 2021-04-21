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
      auth: true,
      role: "getVerbs",
    },
    {
      method: "post",
      route: "/",
      action: "addVerb",
      validate: "emptyValidation",
      auth: true,
      role: "manageVerbs",
    },
    {
      method: "get",
      route: "/init",
      action: "initial",
      validate: "emptyValidation",
      auth: true,
      role: "data",
    },
    {
      method: "get",
      route: "/:id",
      action: "findVerb",
      validate: "emptyValidation",
      auth: true,
      role: "getVerbs",
    },
    {
      method: "put",
      route: "/:id",
      action: "updateVerb",
      validate: "emptyValidation",
      auth: true,
      role: "manageVerbs",
    },
    {
      method: "delete",
      route: "/:id",
      action: "deleteVerb",
      validate: "emptyValidation",
      auth: true,
      role: "manageVerbs",
    },
  ],
};

export default Routes;
