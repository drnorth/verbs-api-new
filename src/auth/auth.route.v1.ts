import { AuthController } from "./auth.controller";
import { AuthValidator } from "./auth.validation";

const Routes = {
  mainRoute: "/auth",
  controller: AuthController,
  validator: AuthValidator,
  subRoutes: [
    {
      method: "post",
      route: "/register",
      action: "register",
      validate: "emptyValidation",
    },
    {
      method: "post",
      route: "/login",
      action: "login",
      validate: "emptyValidation",
    },
    {
      method: "post",
      route: "/logout",
      action: "logout",
      validate: "emptyValidation",
    },
    {
      method: "post",
      route: "/refresh-tokens",
      action: "refreshTokens",
      validate: "emptyValidation",
    },
  ],
};

export default Routes;
