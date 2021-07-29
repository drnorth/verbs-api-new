import { IRouteStructure } from "types.common/route.types";
import { LanguageController } from "./language.controller";
import { LanguageValidator } from "./language.validation";

const Routes: IRouteStructure<
  typeof LanguageController,
  typeof LanguageValidator,
  LanguageValidator
> = {
  mainRoute: "/languages",
  controller: LanguageController,
  validator: LanguageValidator,
  subRoutes: [
    {
      method: "get",
      route: "/",
      action: "all",
      validate: "emptyValidation",
      auth: true,
      role: "getLanguages",
    },
  ],
};

export default Routes;