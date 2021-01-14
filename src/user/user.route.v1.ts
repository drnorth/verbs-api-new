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
      auth: true,
      role: "getUsers",
    },
    {
      method: "post",
      route: "/",
      action: "save",
      validate: "add",
      auth: true,
      role: "manageUsers",
    },
    {
      method: "get",
      route: "/info",
      action: "info",
      validate: "emptyValidation",
      auth: true,
      role: "userInfo",
    },
    {
      method: "get",
      route: "/:id",
      action: "one",
      validate: "emptyValidation",
      auth: true,
      role: "getUsers",
    },
    {
      method: "put",
      route: "/:id",
      action: "update",
      validate: "emptyValidation",
      auth: true,
      role: "manageUsers",
    },
    {
      method: "delete",
      route: "/:id",
      action: "remove",
      validate: "emptyValidation",
      auth: true,
      role: "manageUsers",
    },
  ],
};

export default Routes;
