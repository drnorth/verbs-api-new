import { VerbController } from "./verb.controller";

const Routes = {
  mainRoute: "/verbs",
  controller: VerbController,
  subRoutes: [
    {
      method: "get",
      route: "/",
      action: "getAll",
    },
    {
      method: "post",
      route: "/",
      action: "addVerb",
    },
    {
      method: "get",
      route: "/init",
      action: "initial",
    },
    {
      method: "get",
      route: "/:id",
      action: "findVerb",
    },
    {
      method: "put",
      route: "/:id",
      action: "updateVerb",
    },
    {
      method: "delete",
      route: "/:id",
      action: "deleteVerb",
    },
  ],
};

export default Routes;
