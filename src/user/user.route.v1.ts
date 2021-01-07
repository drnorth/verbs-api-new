import { UserController } from "./user.controller";

const Routes = {
  mainRoute: "/users",
  controller: UserController,
  subRoutes: [
    {
      method: "get",
      route: "/",
      action: "all",
    },
    {
      method: "post",
      route: "/",
      action: "save",
    },
    {
      method: "get",
      route: "/:id",
      action: "one",
    },
    {
      method: "delete",
      route: "/:id",
      action: "remove",
    },
  ],
};

export default Routes;
