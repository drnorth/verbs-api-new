import { AuthController } from "./auth.controller";
import { AuthValidator } from "./auth.validation";
import { IRouteStructure } from "types.common/route.types";

const Routes: IRouteStructure<
  typeof AuthController,
  typeof AuthValidator,
  AuthValidator
> = {
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
      validate: "login",
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
      validate: "refreshToken",
    },
  ],
};

export default Routes;

/**
 * @swagger
 *
 * /login
 *  post:
 *    produces:
 *      -application/json
 *    parameters:
 *      - name: fastLogin
 *        in:
 *
 */
