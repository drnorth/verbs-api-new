import { IRouteStructure } from "types.common/route.types";
import { FindWordController } from "./findWord.controller";
import { FindWordValidator } from "./findWord.validation";

const Routes: IRouteStructure<
  typeof FindWordController,
  typeof FindWordValidator,
  FindWordValidator
> = {
  mainRoute: "/findWord",
  controller: FindWordController,
  validator: FindWordValidator,
  subRoutes: [
    {
      method: "get",
      route: "/",
      action: "getTest",
      validate: "emptyValidation",
      auth: true,
      role: "findWord",
    },
    {
      method: "post",
      route: "/",
      action: "resultTest",
      validate: "emptyValidation",
      auth: true,
      role: "findWord",
    },
  ],
};

export default Routes;
