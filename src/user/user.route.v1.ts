import { UserController } from "./user.controller";
import { UserValidator } from "./user.validation";

const Routes = {
  mainRoute: "/users",
  controller: UserController,
  validator: UserValidator,
  subRoutes: [
    {
      method: "get",
      route: "/",
      action: "all",
      validate: "add",
    },
    {
      method: "post",
      route: "/",
      action: "save",
      validate: "emptyValidation",
    },
    {
      method: "get",
      route: "/:id",
      action: "one",
      validate: "emptyValidation",
    },
    {
      method: "delete",
      route: "/:id",
      action: "remove",
      validate: "emptyValidation",
    },
  ],
};

export default Routes;
