import { IRouteStructure } from "types.common/route.types";
import { UserController } from "./user.controller";
import { UserValidator } from "./user.validation";

const Routes: IRouteStructure<
  typeof UserController,
  typeof UserValidator,
  UserValidator
> = {
  mainRoute: "/users",
  controller: UserController,
  validator: UserValidator,
  subRoutes: [
    {
      method: "get",
      route: "/",
      action: "all",
      validate: "emptyValidation",
    },
    {
      method: "post",
      route: "/",
      action: "save",
      validate: "add",
    },
    {
      method: "get",
      route: "/:id",
      action: "one",
      validate: "emptyValidation",
    },
    {
      method: "put",
      route: "/:id",
      action: "update",
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
